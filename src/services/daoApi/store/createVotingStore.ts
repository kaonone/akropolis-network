import * as R from 'ramda';
import BN, { BigNumber } from 'bignumber.js';
import { map } from 'rxjs/operators';
import AragonWrapper from '@aragon/wrapper';
import ContractProxy from '@aragon/wrapper/dist/core/proxy';

import { currentAddress$, getCurrentAccount } from 'services/user';
import { IVoting, VotingIntent, VotingDecision } from 'shared/types/models';
import { ONE_ERC20 } from 'shared/constants';
import { addressesEqual } from 'shared/helpers/web3';

import { IEvent, IVotingState, ISimpleEvent } from './types';
import { getStore } from './getStore';

const ACCOUNTS_TRIGGER = Symbol('ACCOUNTS_TRIGGER');
export const EMPTY_CALLSCRIPT = '0x00000001';

interface IVotingInfoFromEvent {
  voteId: string;
  creator: string;
  metadata: string;
}

interface IVoteFromContract {
  executed: boolean;
  minAcceptQuorum: string;
  nay: string;
  open: boolean;
  script: string;
  snapshotBlock: string;
  startDate: string;
  supportRequired: string;
  votingPower: string;
  yea: string;
}

type CastVote = IEvent<'CastVote', {
  voteId: string;
  voter: string;
}>;

type ExecuteVote = IEvent<'ExecuteVote', {
  voteId: string;
}>;

type StartVote = IEvent<'StartVote', {
  voteId: string;
  creator: string;
  metadata: string;
}>;

type AccountEvent = ISimpleEvent<typeof ACCOUNTS_TRIGGER, {
  account: string;
}>;

type Event =
  | AccountEvent
  | CastVote
  | ExecuteVote
  | StartVote;

export const initialVotingState: IVotingState = {
  config: {
    PCT_BASE: new BigNumber(0),
    token: '',
    voteTime: 0,
  },
  connectedAccountVotes: {},
  canVoteConnectedAccount: {},
  votings: {},
  ready: false,
};

export async function createVotingStore(wrapper: AragonWrapper, proxy: ContractProxy) {
  const [token, PCT_BASE, voteTime] = await Promise.all([
    proxy.call('token') as Promise<string>,
    proxy.call('PCT_BASE').then(value => new BigNumber(value)),
    proxy.call('voteTime').then(value => parseInt(value, 10) * 1000),
  ]);

  const initialWithConfig: IVotingState = {
    ...initialVotingState,
    config: { token, PCT_BASE, voteTime },
  };

  const accountEvents$ = currentAddress$.pipe(
    map<string, AccountEvent>(account => ({
      event: ACCOUNTS_TRIGGER,
      returnValues: { account },
    })),
  );

  return getStore(
    async (state: IVotingState, events: Event[], isCompleteLoading: boolean): Promise<IVotingState> => {
      const eventsForReloadVotings: Array<Event['event']> = ['CastVote', 'ExecuteVote', 'StartVote'];
      const votingIdsForReload = events
        .filter((item): item is StartVote | CastVote | ExecuteVote => eventsForReloadVotings.includes(item.event))
        .map(item => item.returnValues.voteId);

      const votingInfoFromEvents: Record<string, IVotingInfoFromEvent> = R.indexBy(
        R.prop('voteId'),
        events
          .filter((item): item is StartVote => item.event === 'StartVote')
          .map(({ returnValues: { creator, metadata, voteId } }) => ({ creator, metadata, voteId })),
      );

      const loadedVotings = await loadVoting(wrapper, proxy, votingIdsForReload);
      const votings: Record<string, IVoting> = R.mergeDeepRight(
        R.mergeDeepRight(state.votings, loadedVotings),
        votingInfoFromEvents,
      );

      const currentAddress = await getCurrentAccount();
      const isChangedAccount = !!events.find(item => item.event === ACCOUNTS_TRIGGER);

      const votingIdsForReloadAccountVote = isChangedAccount
        ? Object.values(votings).map(item => item.id)
        : events
          .filter((item): item is StartVote | CastVote => (
            item.event === 'StartVote' ||
            item.event === 'CastVote' && addressesEqual(item.returnValues.voter, currentAddress)
          ))
          .map(item => item.returnValues.voteId);

      const loadedConnectedAccountVotes = await loadAccountVotes(proxy, votingIdsForReloadAccountVote, currentAddress);
      const connectedAccountVotes = R.mergeDeepRight(state.connectedAccountVotes, loadedConnectedAccountVotes);

      const votingIdsForReloadCanVote = isChangedAccount
        ? Object.values(votings).map(item => item.id)
        : events
          .filter((item): item is StartVote => item.event === 'StartVote')
          .map(item => item.returnValues.voteId);

      const loadedCanVoteConnectedAccount = await loadCanVotes(proxy, votingIdsForReloadCanVote, currentAddress);
      const canVoteConnectedAccount = R.mergeDeepRight(state.canVoteConnectedAccount, loadedCanVoteConnectedAccount);

      return {
        ...state,
        votings,
        connectedAccountVotes,
        canVoteConnectedAccount,
        ready: isCompleteLoading,
      };
    },
    initialWithConfig,
    [proxy],
    [accountEvents$],
  );
}

/***********************
 *                     *
 *       Helpers       *
 *                     *
 ***********************/
async function loadCanVotes(
  proxy: ContractProxy, voteIds: string[], connectedAccount: string,
): Promise<Record<string, boolean>> {
  const connectedAccountVotes = await Promise.all(
    R.uniq(voteIds).map(async voteId => {
      const canVote: boolean = await proxy.call('canVote', voteId, connectedAccount);
      return { voteId, canVote };
    }),
  );

  return R.map(
    R.prop('canVote'),
    R.indexBy(R.prop('voteId'), connectedAccountVotes),
  );
}

async function loadAccountVotes(
  proxy: ContractProxy, voteIds: string[], connectedAccount: string,
): Promise<Record<string, VotingDecision>> {
  const connectedAccountVotes = await Promise.all(
    R.uniq(voteIds).map(async voteId => {
      const voteType = await getVoterState(proxy, { connectedAccount, voteId });
      return { voteId, voteType };
    }),
  );

  return R.map(
    R.prop('voteType'),
    R.indexBy(R.prop('voteId'), connectedAccountVotes),
  );
}

async function getVoterState(
  proxy: ContractProxy, options: { connectedAccount: string, voteId: string },
): Promise<VotingDecision> {
  const { connectedAccount, voteId } = options;
  const voterState: string = await proxy.call('getVoterState', voteId, connectedAccount);

  return voteTypeFromContractEnum(voterState);
}

export function voteTypeFromContractEnum(value: string): VotingDecision {
  if (value === '1') {
    return 'confirm';
  }
  if (value === '2') {
    return 'reject';
  }
  return 'absent';
}

async function loadVoting(
  wrapper: AragonWrapper, proxy: ContractProxy, voteIds: string[],
): Promise<Record<string, IVoting>> {
  const votes = await Promise.all(R.uniq(voteIds).map(async id => {
    const {
      minAcceptQuorum, nay, startDate, snapshotBlock, supportRequired, votingPower, yea, executed, open, script,
    }: IVoteFromContract = await proxy.call('getVote', id);
    const { description, intentDetails } = await loadVotingDescription(wrapper, script);
    const intent = calculateVotingIntent(intentDetails);

    return {
      id,
      intent,
      executed,
      open,
      script,
      description,
      intentDetails,
      minAcceptQuorum: new BN(minAcceptQuorum).div(ONE_ERC20).times(100).toNumber(),
      supportRequired: new BN(supportRequired).div(ONE_ERC20).times(100).toNumber(),
      votingPower: new BN(votingPower).div(ONE_ERC20).toNumber(),
      nay: new BN(nay).div(ONE_ERC20).toNumber(),
      yea: new BN(yea).div(ONE_ERC20).toNumber(),
      snapshotBlock: parseInt(snapshotBlock, 10),
      startDate: parseInt(startDate, 10) * 1000,
      creator: '',
      metadata: '',
    };
  }));

  return R.indexBy(R.prop('id'), votes);
}

function calculateVotingIntent(intentDetails: IVoting['intentDetails']): VotingIntent {
  if (!intentDetails[0]) {
    return { type: 'unknown' };
  }

  const addressRegexStr = '0x[a-fA-F0-9]{40}';
  const details = intentDetails[0];

  if (details.name.startsWith('Token') && details.description.startsWith('Mint')) {
    const [, address] = details.description.match(new RegExp(`^.+?(${addressRegexStr})$`)) || ([] as string[]);
    return {
      type: 'joinToDao',
      payload: { address },
    };
  }

  if (details.name.startsWith('Finance') && details.description.startsWith('Create a new payment')) {
    const [, amount, to, reason] = details.description.match(
      new RegExp(`^Create a new payment of ([0-9.]+?) .+? to (${addressRegexStr}).+?'(.*)'$`),
    ) || ([] as string[]);
    return {
      type: 'withdrawRequest',
      payload: {
        to,
        reason,
        amount: parseFloat(amount),
      },
    };
  }

  return { type: 'unknown' };
}

async function loadVotingDescription(
  wrapper: AragonWrapper, voteScript?: string,
): Promise<Pick<IVoting, 'description' | 'intentDetails'>> {
  if (!voteScript || voteScript === EMPTY_CALLSCRIPT) {
    return {
      intentDetails: [],
    };
  }

  const intentDetails = await wrapper.describeTransactionPath(
    wrapper.decodeTransactionPath(voteScript),
  );
  return {
    intentDetails,
    description: intentDetails
      ? intentDetails
        .map(step => {
          const identifier = step.identifier ? ` (${step.identifier})` : '';
          const app = step.name ? `${step.name}${identifier}` : `${step.to}`;

          return `${app}: ${step.description || 'No description'}`;
        })
        .join('\n')
      : undefined,
  };
}
