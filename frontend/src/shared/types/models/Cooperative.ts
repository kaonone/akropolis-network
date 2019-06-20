import BigNumber from 'bignumber.js';

export interface ICooperative {
  name: string;
  goal: number;
  description: string;
  balance: BigNumber;
  membersCount: number;
}
