import BigNumber from 'bignumber.js';
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
  daoCreationDate: number;
}

export interface IFinanceState {
  transactions: Record<string, IFinanceTransaction>;
  holders: Record<string, IFinanceHolder>;
  vaultAddress: string;
  daoOverview: IDaoOverview;
  balanceHistory: IBalanceHistoryPoint[];
  ready: boolean;
}

export interface ISimpleEvent<E extends string | symbol = string, V = any> {
  event: E;
  returnValues: V;
}

export interface IDaoOverview {
  balance: IDaoOverviewMetric;
  deposit: IDaoOverviewMetric;
  withdraw: IDaoOverviewMetric;
}

interface IDaoOverviewMetric {
  value: number;
  valueDayAgo: number;
}

export interface IBalanceHistoryPoint {
  date: number;
  value: number;
}
