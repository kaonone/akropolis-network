import Web3 from 'web3';

export type Provider = typeof Web3.givenProvider;
export type ProviderType =
  'metamask' | 'trust' | 'toshi' | 'cipher' | 'mist' | 'parity' | 'infura' | 'localhost' | 'unknown';

export type ID = number;
export type UUID = string;

export interface IHolder {
  balance: number;
  address: string;
}

export interface IFinanceTransaction {
  id: string;
  amount: number;
  date: number;
  entity: string;
  isIncoming: boolean;
  paymentId: string;
  periodId: string;
  token: string;
}

export interface IFinanceHolder extends IHolder {
  deposit: number;
  withdraw: number;
}
