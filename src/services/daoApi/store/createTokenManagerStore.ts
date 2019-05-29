import Web3 from 'web3';
import BN from 'bignumber.js';
import ContractProxy from '@aragon/wrapper/dist/core/proxy';

import tokenAbi from 'blockchain/abi/minimeToken.json';
import { IHolder } from 'shared/types/models';
import { ONE_ERC20 } from 'shared/constants';

import { IEvent, ITokenManagerState } from './types';
import { getStore } from './getStore';

type ClaimedTokensEvent = IEvent<'ClaimedTokens', {
  _token: string;
  _controller: string;
}>;

type TransferEvent = IEvent<'Transfer', {
  _from: string;
  _to: string;
}>;

type Event =
  | ClaimedTokensEvent
  | TransferEvent;

export const initialTokenManagerState: ITokenManagerState = {
  holders: {},
  tokenAddress: '',
  tokenSupply: '0',
  ready: false,
};

export async function createTokenManagerStore(web3: Web3, proxy: ContractProxy) {
  const tokenAddr: string = await proxy.call('token');
  const tokenProxy = new ContractProxy(tokenAddr, tokenAbi, web3, proxy.initializationBlock);

  return getStore(
    async (state: ITokenManagerState, events: Event[], isCompleteLoading: boolean) => {
      // The transfer may have increased the token's total supply, so let's refresh it
      const isNeedUpdateTokenSupply = events.some(({ event }) => event === 'Transfer');
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
        holders,
        tokenAddress: tokenAddr,
        ready: isCompleteLoading,
      };
    },
    initialTokenManagerState,
    [
      proxy.events(),
      tokenProxy.events(),
    ],
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
        return { address, balance: new BN(balance).div(ONE_ERC20).toNumber() };
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
