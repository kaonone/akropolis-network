import Web3 from 'web3';
import * as R from 'ramda';
import BN from 'bignumber.js';
import ContractProxy from '@aragon/wrapper/dist/core/proxy';

import tokenAbi from 'blockchain/abi/minimeToken.json';
import { IEthereumEvent, IHolder } from 'shared/types/models';
import { ONE_ERC20 } from 'shared/constants';
import { makeStoreFromEvents } from 'shared/helpers/makeStoreFromEvents';

import { ITokenManagerState, ITokenMint } from './types';

type ClaimedTokensEvent = IEthereumEvent<'ClaimedTokens', {
  _token: string;
  _controller: string;
}>;

type TransferEvent = IEthereumEvent<'Transfer', {
  _from: string;
  _to: string;
}>;

type Event =
  | ClaimedTokensEvent
  | TransferEvent;

export const initialTokenManagerState: ITokenManagerState = {
  holders: {},
  tokenMints: {},
  tokenAddress: '',
  tokenSupply: '0',
  ready: false,
  daoCreationDate: 0,
};

export async function createTokenManagerStore(web3: Web3, proxy: ContractProxy) {
  const tokenAddr: string = await proxy.call('token');
  const tokenProxy = new ContractProxy(tokenAddr, tokenAbi, web3, proxy.initializationBlock);

  const firstBlock = await web3.eth.getBlock(proxy.initializationBlock);
  const daoCreationDate = firstBlock.timestamp * 1000;

  return makeStoreFromEvents(
    async (state: ITokenManagerState, events: Event[], isCompleteLoading: boolean) => {
      // The transfer may have increased the token's total supply, so let's refresh it
      const isNeedUpdateTokenSupply = events.some(({ event }) => event === 'Transfer');

      const newTokenMints = await loadTokenMints(web3, events);

      const tokenMints = Object.values(newTokenMints).length !== 0 ?
        { ...state.tokenMints, ...newTokenMints } : state.tokenMints;

      const addressesForLoadBalance = Array.from(
        events.reduce((acc, cur) => {
          switch (cur.event) {
            case 'ClaimedTokens': {
              acc.add(cur.returnValues._token);
              acc.add(cur.returnValues._controller);
              break;
            }
            case 'Transfer': {
              acc.add(cur.returnValues._from);
              acc.add(cur.returnValues._to);
              break;
            }
          }
          return acc;
        }, new Set<string>()),
      );

      const tokenSupply = isNeedUpdateTokenSupply
        ? await tokenProxy.call('totalSupply')
        : state.tokenSupply;

      const holders = updateHolders(
        state.holders,
        await loadNewBalances(tokenProxy, ...addressesForLoadBalance),
      );

      return {
        ...state,
        tokenSupply,
        tokenMints,
        holders,
        tokenAddress: tokenAddr,
        ready: isCompleteLoading,
        daoCreationDate,
      };
    },
    initialTokenManagerState,
    [proxy, tokenProxy],
  );
}

/***********************
 *                     *
 *       Helpers       *
 *                     *
 ***********************/

function updateHolders(prevHolders: Record<string, IHolder>, changes: IHolder[]) {
  return changes
    .reduce((holders: Record<string, IHolder>, changed: IHolder): Record<string, IHolder> => {
      if (!Number(changed.balance)) {
        // remove holder with zero balance
        delete holders[changed.address];
      } else {
        holders[changed.address] = changed;
      }

      return holders;
    }, { ...prevHolders });
}

async function loadNewBalances(token: ContractProxy, ...addresses: string[]): Promise<IHolder[]> {
  try {
    return Promise.all(
      addresses.map(async address => {
        const balance: string = await token.call('balanceOf', address);
        return { address, balance: new BN(balance).div(ONE_ERC20) };
      }),
    );
  }
  catch (err) {
    console.error(`Failed to load new balances for ${addresses.join(', ')} due to:`, err);
    // Return an empty object to avoid changing any state
    // TODO: ideally, this would actually cause the UI to show "unknown" for the address
    return [];
  }
}

async function loadTokenMints(web3: Web3, events: Event[]): Promise<Record<string, ITokenMint>> {
  try {
    const mints: ITokenMint[] = await Promise.all(
      events.filter((event): event is TransferEvent => event.event === 'Transfer')
        .map(async event => {
          const block = await web3.eth.getBlock(event.blockNumber);
          return { address: event.returnValues._to, startDate: block.timestamp * 1000 };
        }),
    );

    const mintsUniqByAddress = R.uniqWith(R.eqBy(R.prop('address')), mints.sort(R.ascend(R.prop('startDate'))));

    return mintsUniqByAddress.reduce((acc, cur) => {
      acc[cur.address] = { ...cur };
      return acc;
    }, {} as Record<string, ITokenMint>);
  }
  catch (err) {
    console.error(`Failed to load tokenMints due to:`, err);
    return {};
  }
}
