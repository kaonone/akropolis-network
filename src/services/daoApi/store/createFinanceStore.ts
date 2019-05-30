import Web3 from 'web3';
import * as R from 'ramda';
import BN from 'bignumber.js';
import * as moment from 'moment';
import ContractProxy from '@aragon/wrapper/dist/core/proxy';

import vaultAbi from 'blockchain/abi/vault.json';
import { NETWORK_CONFIG } from 'core/constants';
import { IFinanceTransaction, IFinanceHolder } from 'shared/types/models';
import { ONE_ERC20 } from 'shared/constants';
import { difference } from 'shared/helpers/integer';
import { addressesEqual } from 'shared/helpers/web3';

import { IEvent, IFinanceState } from './types';
import { getStore } from './getStore';

type VaultEvent = IEvent<'MockEventName', {
  token: string;
}>;

type NewTransactionEvent = IEvent<'NewTransaction', {
  reference: string;
  transactionId: string;
}>;

type FinanceEvent = NewTransactionEvent;

type Event =
  | VaultEvent
  | FinanceEvent;

export const initialFinanceState: IFinanceState = {
  holders: {},
  transactions: {},
  vaultAddress: '',
  daoOverview: {
    balance: { value: 0, change: 0 },
    withdraw: { value: 0, change: 0 },
    deposit: { value: 0, change: 0 },
  },
  ready: false,
};

export async function createFinanceStore(web3: Web3, proxy: ContractProxy) {
  const vaultAddress: string = await proxy.call('vault');
  const vaultProxy = new ContractProxy(vaultAddress, vaultAbi, web3);
  await vaultProxy.updateInitializationBlock();

  return getStore(
    async (state: IFinanceState, events: Event[], isCompleteLoading: boolean): Promise<IFinanceState> => {
      const vaultMainCoinEvents = events
        .filter((event): event is VaultEvent => event.address === vaultAddress)
        .filter(event => event.returnValues.token === NETWORK_CONFIG.daiContract);
      const financeEvents = events.filter((event): event is FinanceEvent => event.address !== vaultAddress);

      const isNeedLoadBalance = !!vaultMainCoinEvents.length;
      const transactionsForLoad = R.uniq(financeEvents
        .filter((event): event is NewTransactionEvent => event.event === 'NewTransaction')
        .map(event => event.returnValues.transactionId));

      const daoBalance = isNeedLoadBalance
        ? new BN(await vaultProxy.call('balance', NETWORK_CONFIG.daiContract)).div(ONE_ERC20).toNumber()
        : state.daoOverview.balance.value;

      const mainCoinNewTransactions: IFinanceTransaction[] = (await Promise.all(
        transactionsForLoad.map(async id => ({ id, ...await proxy.call('getTransaction', id) })),
      )).map<IFinanceTransaction>(item => ({
        ...item,
        amount: new BN(item.amount).div(ONE_ERC20).toNumber(),
        date: parseInt(item.date, 10) * 1000,
      })).filter(item => addressesEqual(item.token, NETWORK_CONFIG.daiContract));

      const nextTransactions = mainCoinNewTransactions.length
        ? {
          ...state.transactions,
          ...R.indexBy(R.prop('id'), mainCoinNewTransactions),
        } : state.transactions;

      const holders: Record<string, IFinanceHolder> = mainCoinNewTransactions.length
        ? reduceHolders(Object.values(nextTransactions))
        : state.holders;

      const dayAgo = moment().subtract(1, 'days').valueOf();
      const holdersForDay: IFinanceHolder[] = Object.values(
        reduceHolders(Object.values(nextTransactions).filter(transaction => transaction.date > dayAgo)),
      );
      const balanceChangeForDay = R.sum((holdersForDay).map(item => item.balance));
      const depositChangeForDay = R.sum((holdersForDay).map(item => item.deposit));
      const withdrawChangeForDay = R.sum((holdersForDay).map(item => item.withdraw));

      const daoDeposit = R.sum(Object.values(holders).map(item => item.deposit));
      const daoWithdraw = R.sum(Object.values(holders).map(item => item.withdraw));

      const daoOverview: IFinanceState['daoOverview'] = {
        balance: {
          value: daoBalance,
          change: difference(daoBalance, balanceChangeForDay),
        },
        deposit: {
          value: daoDeposit,
          change: difference(daoDeposit, depositChangeForDay),
        },
        withdraw: {
          value: daoWithdraw,
          change: difference(daoWithdraw, withdrawChangeForDay),
        },
      };

      return {
        ...state,
        holders,
        daoOverview,
        vaultAddress,
        transactions: nextTransactions,
        ready: isCompleteLoading,
      };
    },
    initialFinanceState,
    [proxy, vaultProxy],
  );
}

function reduceHolders(nextTransactions: IFinanceTransaction[]): Record<string, IFinanceHolder> {
  return nextTransactions
    .reduce<Record<string, IFinanceHolder>>((acc, cur) => {
      const prevHolderState: IFinanceHolder = acc[cur.entity] || {
        address: cur.entity,
        balance: 0,
        withdraw: 0,
        deposit: 0,
      };
      const holder: IFinanceHolder = {
        ...prevHolderState,
        balance: prevHolderState.balance + (cur.isIncoming ? cur.amount : -cur.amount),
        withdraw: prevHolderState.withdraw + (cur.isIncoming ? 0 : cur.amount),
        deposit: prevHolderState.deposit + (cur.isIncoming ? cur.amount : 0),
      };
      return { ...acc, [cur.entity]: holder };
    }, {});
}
