export interface ICompound {
  annualPercent: number;
  coin: string;
  type: CompoundType;
  icon: string;
  description: string;
  balance: number;
  earned: number;
  status: CompoundStatus;
}

export type CompoundType = 'saving' | 'credit' | 'investment';
export type CompoundStatus = 'need-enable' | 'active' | 'waiting';
