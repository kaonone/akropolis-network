import { EventLog } from 'web3/types';
import { Omit } from '_helpers';
import { IHolder, IFinanceHolder, IFinanceTransaction } from 'shared/types/models';

export interface ITokenManagerState {
  holders: IHolder[];
  tokenAddress: string;
  tokenSupply: string;
  ready: boolean;
}

export interface IFinanceState {
  transactions: Record<string, IFinanceTransaction>;
  holders: Record<string, IFinanceHolder>;
  vaultAddress: string;
  daoOverview: Omit<IFinanceHolder, 'address'>;
  ready: boolean;
}

export interface IEvent<E extends string = string, V = any> extends EventLog {
  event: E;
  returnValues: V;
}

export type StoreReducer<T> = (state: T, events: EventLog[], isCompleteLoading: boolean) => Promise<T> | T;
