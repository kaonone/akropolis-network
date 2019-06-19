import Web3 from 'web3';
import * as R from 'ramda';
import BN from 'bignumber.js';
import * as moment from 'moment';
import ContractProxy from '@aragon/wrapper/dist/core/proxy';

import vaultAbi from 'blockchain/abi/vault.json';
import { NETWORK_CONFIG } from 'core/constants';
import { IEthereumEvent, IFinanceTransaction, IFinanceHolder } from 'shared/types/models';
import { ONE_ERC20 } from 'shared/constants';
import { addressesEqual } from 'shared/helpers/web3';
import { makeStoreFromEvents } from 'shared/helpers/makeStoreFromEvents';

import { IFinanceState } from './types';

type VaultEvent = IEthereumEvent<'MockEventName', {
  token: string;
}>;

type NewTransactionEvent = IEthereumEvent<'NewTransaction', {
  reference: string;
  transactionId: string;
  entity: string;
  incoming: boolean;
  amount: string;
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
    balance: { value: new BN(0), valueDayAgo: new BN(0) },
    withdraw: { value: new BN(0), valueDayAgo: new BN(0) },
    deposit: { value: new BN(0), valueDayAgo: new BN(0) },
  },
  ready: false,
};

export async function createFinanceStore(web3: Web3, proxy: ContractProxy) {
  const vaultAddress: string = await proxy.call('vault');
  const vaultProxy = new ContractProxy(vaultAddress, vaultAbi, web3);
  await vaultProxy.updateInitializationBlock();

  return makeStoreFromEvents(
    async (state: IFinanceState, events: Event[], isCompleteLoading: boolean): Promise<IFinanceState> => {
      const vaultMainCoinEvents = events
        .filter((event): event is VaultEvent => addressesEqual(event.address, vaultAddress))
        .filter(event => addressesEqual(event.returnValues.token, NETWORK_CONFIG.daiContract));
      const financeEvents = events
        .filter((event): event is FinanceEvent => !addressesEqual(event.address, vaultAddress));

      const isNeedLoadBalance = !!vaultMainCoinEvents.length;
      const transactionsForLoad = R.uniq(financeEvents
        .filter((event): event is NewTransactionEvent => event.event === 'NewTransaction')
        .map(event => event.returnValues.transactionId));

      const daoBalance = isNeedLoadBalance
        ? new BN(await vaultProxy.call('balance', NETWORK_CONFIG.daiContract)).div(ONE_ERC20)
        : state.daoOverview.balance.value;

      const mainCoinNewTransactions: IFinanceTransaction[] = (await Promise.all(
        transactionsForLoad.map(async id => ({ id, ...await proxy.call('getTransaction', id) })),
      )).map<IFinanceTransaction>(item => ({
        ...item,
        amount: new BN(item.amount).div(ONE_ERC20),
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
      const balanceChangeForDay = BN.sum(...holdersForDay.map(item => item.balance));
      const depositChangeForDay = BN.sum(...holdersForDay.map(item => item.deposit));
      const withdrawChangeForDay = BN.sum(...holdersForDay.map(item => item.withdraw));

      const daoDeposit = BN.sum(...Object.values(holders).map(item => item.deposit));
      const daoWithdraw = BN.sum(...Object.values(holders).map(item => item.withdraw));

      const daoOverview: IFinanceState['daoOverview'] = {
        balance: {
          value: daoBalance,
          valueDayAgo: daoBalance.minus(balanceChangeForDay),
        },
        deposit: {
          value: daoDeposit,
          valueDayAgo: daoDeposit.minus(depositChangeForDay),
        },
        withdraw: {
          value: daoWithdraw,
          valueDayAgo: daoWithdraw.minus(withdrawChangeForDay),
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
        balance: new BN(0),
        withdraw: new BN(0),
        deposit: new BN(0),
      };
      const holder: IFinanceHolder = {
        ...prevHolderState,
        balance: prevHolderState.balance.plus(cur.isIncoming ? cur.amount : -cur.amount),
        withdraw: prevHolderState.withdraw.plus(cur.isIncoming ? 0 : cur.amount),
        deposit: prevHolderState.deposit.plus(cur.isIncoming ? cur.amount : 0),
      };
      return { ...acc, [cur.entity]: holder };
    }, {});
}
