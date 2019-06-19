import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { EventLog } from 'web3/types';

export type Provider = typeof Web3.givenProvider;
export type ProviderType =
  'metamask' | 'trust' | 'toshi' | 'cipher' | 'mist' | 'parity' | 'infura' | 'localhost' | 'unknown';

export type ID = number;
export type UUID = string;

export interface IEthereumEvent<E extends string = string, V = any> extends EventLog {
  event: E;
  returnValues: V;
}

export interface IHolder {
  balance: BigNumber;
  address: string;
}

export interface IFinanceTransaction {
  id: string;
  amount: BigNumber;
  date: number;
  entity: string;
  isIncoming: boolean;
  paymentId: string;
  periodId: string;
  token: string;
}

export interface IFinanceHolder extends IHolder {
  deposit: BigNumber;
  withdraw: BigNumber;
}
