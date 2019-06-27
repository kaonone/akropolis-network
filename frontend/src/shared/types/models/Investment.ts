import BigNumber from 'bignumber.js';

const ALL_INVESTMENT_TYPES = ['compound'] as const;

export type InvestmentType = typeof ALL_INVESTMENT_TYPES[number];
export type FutureInvestmentType = 'set' | 'uma' | 'dharma' | 'melonport';
export type InvestmentCategory = 'saving' | 'credit' | 'investment';
export type InvestmentStatus = 'need-enable' | 'active' | 'waiting';

export function isInvestmentType(type: string): type is InvestmentType {
  return (ALL_INVESTMENT_TYPES as readonly string[]).includes(type);
}

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
