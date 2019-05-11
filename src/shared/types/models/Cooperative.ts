export interface ICooperative {
  name: string;
  goal: string; // description
  balance: number;
  membersCount: number;
  eventType?: CooperativeEvent;
}

export type CooperativeEvent = 'new' | 'reviewed';
