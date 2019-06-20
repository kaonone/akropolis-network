export interface ICompoundAccountApiResponse {
  accounts: ICompoundAccount[];
  close_factor: number;
  error: null | CompoundAccountApiErrors;
  liquidation_incentive: number;
  pagination_summary: IPaginationSummary;
  request: ICompoundRequest;
}

enum CompoundAccountApiErrors {
  NO_ERROR = 0,
  INTERNAL_ERROR = 1,
  INVALID_PAGE_NUMBER = 2,
  INVALID_PAGE_SIZE = 3,
}

export interface ICompoundAccount {
  address: string;
  block_updated?: null;
  health: null;
  tokens: ICompoundToken[];
  total_borrow_value_in_eth: IValue;
  total_collateral_value_in_eth: IValue;
}

export interface ICompoundToken {
  address: string;
  borrow_balance_underlying: IValue;
  lifetime_borrow_interest_accrued: IValue;
  lifetime_supply_interest_accrued: IValue;
  supply_balance_underlying: IValue;
  symbol?: null;
}

export interface IValue {
  value: string;
}

export interface IPaginationSummary {
  page_number: number;
  page_size: number;
  total_entries: number;
  total_pages: number;
}

export interface ICompoundRequest {
  addresses?: string[] | null;
  block_number: number;
  block_timestamp: number;
  max_health?: null;
  min_borrow_value_in_eth?: null;
  page_number: number;
  page_size: number;
}
