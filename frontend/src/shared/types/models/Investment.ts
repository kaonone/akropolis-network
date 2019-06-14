import BigNumber from 'bignumber.js';

export type InvestmentType = 'compound';

export interface IInvestmentState {
  balance: BigNumber;
  earn: BigNumber;
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
