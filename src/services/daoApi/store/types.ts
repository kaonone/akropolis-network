import BigNumber from 'bignumber.js';
import { EventLog } from 'web3/types';
import { IHolder, IFinanceHolder, IFinanceTransaction, IVoting, VotingDecision } from 'shared/types/models';

export interface IVotingState {
  config: {
    token: string;
    voteTime: number;
    PCT_BASE: BigNumber;
  };
  votings: Record<string, IVoting>;
  connectedAccountVotes: Record<string, VotingDecision>;
  canVoteConnectedAccount: Record<string, boolean>;
  ready: boolean;
}

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
  daoOverview: DaoOverview;
  ready: boolean;
}

export interface ISimpleEvent<E extends string | symbol = string, V = any> {
  event: E;
  returnValues: V;
}

export interface IEvent<E extends string = string, V = any> extends EventLog {
  event: E;
  returnValues: V;
}

export type StoreReducer<S, E> = (state: S, events: E[] | EventLog[], isCompleteLoading: boolean) => Promise<S> | S;

export type DaoOverview = Record<'balance' | 'debit' | 'credit', IDaoOverviewMetric>;

interface IDaoOverviewMetric {
  value: number;
  change: number; // in percent
}
