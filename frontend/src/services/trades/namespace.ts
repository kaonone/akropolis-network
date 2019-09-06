import { ICommunication, IPlainAction, IAction, IPlainFailAction } from 'shared/types/redux';
import { IAirSwapOrder } from 'shared/types/models';

export interface IReduxState {
  communication: {
    saving: ICommunication;
    loading: ICommunication;
  };
  data: {
    trades: IAirSwapOrder[];
  };
}

export type ISaveTrades = IAction<'TRADES:SAVE_TRADES', IAirSwapOrder[]>;
export type ISaveTradesSuccess = IPlainAction<'TRADES:SAVE_TRADES_SUCCESS'>;
export type ISaveTradesFail = IPlainFailAction<'TRADES:SAVE_TRADES_FAIL'>;

export type ILoadTrades = IPlainAction<'TRADES:LOAD_TRADES'>;
export type ILoadTradesSuccess = IAction<'TRADES:LOAD_TRADES_SUCCESS', IAirSwapOrder[]>;
export type ILoadTradesFail = IPlainFailAction<'TRADES:LOAD_TRADES_FAIL'>;

export type IAddTrade = IAction<'TRADES:ADD_TRADE', IAirSwapOrder>;

export type Action =
  | ISaveTrades | ISaveTradesSuccess | ISaveTradesFail
  | ILoadTrades | ILoadTradesSuccess | ILoadTradesFail
  | IAddTrade;
