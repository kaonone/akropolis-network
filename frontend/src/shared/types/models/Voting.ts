import { IDescribedPathSegment } from '@aragon/wrapper';
import { IPlainAction, IAction } from '../redux';

export type VotingStatus = 'pending' | 'vote-needed' | 'execute-needed' | 'confirmed' | 'rejected';

export type VotingDecision = 'confirm' | 'reject' | 'absent';

export type VotingResult = 'confirmed' | 'rejected';

export type VotingType = VotingIntent['type'];

export type VotingIntent = UnknownIntent | JoinIntent | WithdrawIntent | InvestIntent;

export type UnknownIntent = IPlainAction<'unknown'>;

export type JoinIntent = IAction<'joinToDao', {
  address: string;
}>;

export type WithdrawIntent = IAction<'withdrawRequest', {
  amount: number;
  reason: string;
  to: string;
}>;
export type InvestIntent = IAction<'invest', {
  amount: number;
  reason: string;
  to: string;
}>;

export interface IVoting {
  id: string;
  intent: VotingIntent;
  executed: boolean;
  minAcceptQuorum: number;
  nay: number;
  script: string;
  supportRequired: number;
  votingPower: number;
  yea: number;
  description?: string;
  intentDetails: IDescribedPathSegment[];
  // Like times, blocks should be safe to represent as real numbers
  snapshotBlock: number;
  startDate: number;
  creator: string;
  metadata: string;
}
