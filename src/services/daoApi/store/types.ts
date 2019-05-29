import { EventLog } from 'web3/types';
import { IHolder, IFinanceHolder, IFinanceTransaction } from 'shared/types/models';

export interface ITokenManagerState {
  holders: Record<string, IHolder>;
  tokenAddress: string;
  tokenSupply: string;
  ready: boolean;
}

export interface IFinanceState {
  transactions: Record<string, IFinanceTransaction>;
  holders: Record<string, IFinanceHolder>;
  vaultAddress: string;
  daoOverview: IDaoOverview;
  ready: boolean;
}

export interface IEvent<E extends string = string, V = any> extends EventLog {
  event: E;
  returnValues: V;
}

export type StoreReducer<T> = (state: T, events: EventLog[], isCompleteLoading: boolean) => Promise<T> | T;

export interface IDaoOverview {
  balance: IDaoOverviewMetric;
  debit: IDaoOverviewMetric;
  credit: IDaoOverviewMetric;

}

interface IDaoOverviewMetric {
  value: number;
  change: number; // in percent
}
