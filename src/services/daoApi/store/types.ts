import { EventLog } from 'web3/types';
import { IHolder } from 'shared/types/models';

export interface ITokenManagerState {
  holders: IHolder[];
  tokenAddress: string;
  tokenSupply: string;
  ready: boolean;
}

export interface IEvent<E extends string = string, V = any> extends EventLog {
  event: E;
  returnValues: V;
}

export type StoreReducer<T> = (state: T, events: EventLog[], isCompleteLoading: boolean) => Promise<T> | T;
