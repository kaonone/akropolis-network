import BigNumber from 'bignumber.js';
import { IPlainAction, IAction } from '../redux';

export type VotingStatus = 'pending' | 'vote-needed' | 'execute-needed' | 'confirmed' | 'rejected';

export type VotingDecision = 'confirm' | 'reject' | 'absent';

export type VotingResult = 'confirmed' | 'rejected';

export type VotingType = VotingIntent['type'];

export type VotingIntent =
  | UnknownIntent | JoinIntent | TransferIntent | EnableDeFiAccountIntent | EnableInvestmentIntent
  | DisableDeFiAccountIntent | DisableInvestmentIntent;

export type UnknownIntent = IPlainAction<'unknown'>;

export type JoinIntent = IAction<'joinToDao', {
  address: string;
}>;

export type TransferIntent = IAction<'transfer', {
  amount: BigNumber;
  reason?: string;
  from: string
  to: string;
}>;

export type EnableDeFiAccountIntent = IPlainAction<'enableDeFiAccount'>;
export type DisableDeFiAccountIntent = IPlainAction<'disableDeFiAccount'>;

export type EnableInvestmentIntent = IAction<'enableInvestment', {
  address: string;
}>;

export type DisableInvestmentIntent = IAction<'disableInvestment', {
  address: string;
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
  // Like times, blocks should be safe to represent as real numbers
  snapshotBlock: number;
  startDate: number;
  creator: string;
  metadata: string;
}
