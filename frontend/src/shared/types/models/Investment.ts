import BigNumber from 'bignumber.js';

export type InvestmentType = 'compound';
export type FutureInvestmentType = 'set' | 'uma' | 'dharma' | 'melonport';
export type InvestmentCategory = 'saving' | 'credit' | 'investment';
export type InvestmentStatus = 'need-enable' | 'active' | 'waiting';

export interface IInvestmentState {
  balance: BigNumber;
  earned: BigNumber;
  currentRate: BigNumber;
  isEnabled: boolean;
}

export interface IInvestmentApi {
  isEnabled(agentAddress: string): Promise<boolean>;
  getBalance(agentAddress: string): Promise<BigNumber>;
  getEarn(agentAddress: string): Promise<BigNumber>;
  getCurrentRate(): Promise<BigNumber>;
  enable(): Promise<void>;
  deposit(amount: number): Promise<void>;
  withdraw(amount: number): Promise<void>;
}
