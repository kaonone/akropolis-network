import Web3 from 'web3';

export type Provider = typeof Web3.givenProvider;
export type ProviderType =
'metamask' | 'trust' | 'toshi' | 'cipher' | 'mist' | 'parity' | 'infura' | 'localhost' | 'unknown';

export type ID = number;
export type UUID = string;
