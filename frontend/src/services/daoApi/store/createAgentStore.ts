import Web3 from 'web3';
import { BigNumber } from 'bignumber.js';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import AragonWrapper from '@aragon/wrapper';
import ContractProxy from '@aragon/wrapper/dist/core/proxy';

import Erc20ABI from 'blockchain/abi/erc20.json';
import { NETWORK_CONFIG } from 'core/constants';
import { IEthereumEvent } from 'shared/types/models';
import { IInvestmentState } from 'shared/types/models/Investment';
import { ONE_ERC20 } from 'shared/constants';
import { addressesEqual } from 'shared/helpers/web3';
import { makeStoreFromEvents } from 'shared/helpers/makeStoreFromEvents';

import { InvestmentsApi } from '../InvestmentsApi';
import { ISimpleEvent, IAgentState } from './types';

const COMPOUND_TRIGGER = Symbol('ACCOUNTS_TRIGGER');

type AgentExecute = IEthereumEvent<'Execute', {
  sender: string;
  target: string;
  ethValue: string;
  data: string;
}>;

type NewTransactionEvent = IEthereumEvent<'NewTransaction', {
  reference: string;
  transactionId: string;
  entity: string;
  incoming: boolean;
  amount: string;
}>;

type EthereumEvent =
  | NewTransactionEvent
  | AgentExecute;

type CompoundTrigger = ISimpleEvent<typeof COMPOUND_TRIGGER>;

type LocalEvent =
  | CompoundTrigger;

type Event = EthereumEvent | LocalEvent;

export const initialAgentState: IAgentState = {
  availableBalance: new BigNumber(0),
  investments: {
    compound: {
      balance: new BigNumber(0),
      currentRate: new BigNumber(0),
      earn: new BigNumber(0),
      isEnabled: false,
    },
  },
  ready: false,
};

export async function createAgentStore(wrapper: AragonWrapper, investments: InvestmentsApi, proxies: {
  agentProxy: ContractProxy,
  financeProxy: ContractProxy,
}) {
  const { agentProxy, financeProxy } = proxies;

  const compoundTriggers$ = interval(5000).pipe(
    map<number, CompoundTrigger>(() => ({
      event: COMPOUND_TRIGGER,
      returnValues: {},
    })),
  );

  return makeStoreFromEvents(
    async (state: IAgentState, events: Event[], isCompleteLoading: boolean): Promise<IAgentState> => {
      const ethereumEvents = events.filter((item: any): item is EthereumEvent => Boolean(item && item.address));
      const localEvents = events.filter((item: any): item is LocalEvent => Boolean(item && !item.address));

      const agentEvents = ethereumEvents.filter(item => addressesEqual(item.address, agentProxy.address));
      const financeEvents = ethereumEvents.filter(item => addressesEqual(item.address, financeProxy.address));
      const compoundTriggers = localEvents.filter((item): item is CompoundTrigger => item.event === COMPOUND_TRIGGER);

      const financeAndAgentTransactionEvents = financeEvents
        .filter((item): item is NewTransactionEvent => item.event === 'NewTransaction')
        .filter(item => addressesEqual(agentProxy.address, item.returnValues.entity));

      const agentToCompoundExecutions = agentEvents
        .filter((item): item is AgentExecute => item.event === 'Execute')
        .filter(item => addressesEqual(NETWORK_CONFIG.daiCompound, item.returnValues.target));

      const needToUpdateAgentBalance = !!financeAndAgentTransactionEvents.length;
      const needToUpdateCompoundState = !!agentToCompoundExecutions.length || !!compoundTriggers.length;
      const needToUpdateReady = !state.ready && isCompleteLoading;

      if (!(needToUpdateAgentBalance || needToUpdateCompoundState || needToUpdateReady)) {
        return state;
      }

      const availableBalance = needToUpdateAgentBalance
        ? await getErc20Balance(wrapper.web3, NETWORK_CONFIG.daiContract, agentProxy.address)
        : state.availableBalance;

      const compound: IInvestmentState = needToUpdateCompoundState ? {
        balance: await investments.compound.getBalance(agentProxy.address),
        currentRate: await investments.compound.getCurrentRate(),
        earn: await investments.compound.getEarn(agentProxy.address),
        isEnabled: await investments.compound.isEnabled(agentProxy.address),
      } : state.investments.compound;

      return {
        availableBalance,
        investments: {
          compound,
        },
        ready: isCompleteLoading,
      };
    },
    initialAgentState,
    [agentProxy, financeProxy],
    [compoundTriggers$],
  );
}

/***********************
 *                     *
 *       Helpers       *
 *                     *
 ***********************/

async function getErc20Balance(web3: Web3, tokenAddress: string, holderAddress: string): Promise<BigNumber> {
  const tokenProxy = new ContractProxy(tokenAddress, Erc20ABI, web3);
  const balance: string = await tokenProxy.call('balanceOf', holderAddress);

  return new BigNumber(balance).div(ONE_ERC20);
}
