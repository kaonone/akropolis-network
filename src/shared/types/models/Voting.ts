import { IDescribedPathSegment } from '@aragon/wrapper';
import { IPlainAction, IAction } from '../redux';

export type VotingDecision = 'confirm' | 'reject' | 'absent';

export type VotingType = VotingIntent['type'];

export type VotingIntent =
  | IPlainAction<'unknown'>
  | IAction<'joinToDao', {
    address: string;
  }>
  | IAction<'withdrawRequest', {
    amount: number;
    reason: string;
    to: string;
  }>
  | IAction<'invest', {
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
