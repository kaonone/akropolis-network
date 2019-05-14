export interface ICooperative {
  name: string;
  goal: number;
  description: string;
  balance: number;
  membersCount: number;
  eventType?: CooperativeEvent;
}

export type CooperativeEvent = 'new' | 'reviewed';
