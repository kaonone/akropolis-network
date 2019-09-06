import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: saveTrades, completed: saveTradesSuccess, failed: saveTradesFail } =
  makeCommunicationActionCreators<NS.ISaveTrades, NS.ISaveTradesSuccess, NS.ISaveTradesFail>(
    'TRADES:SAVE_TRADES', 'TRADES:SAVE_TRADES_SUCCESS', 'TRADES:SAVE_TRADES_FAIL',
  );

export const { execute: loadTrades, completed: loadTradesSuccess, failed: loadTradesFail } =
  makeCommunicationActionCreators<NS.ILoadTrades, NS.ILoadTradesSuccess, NS.ILoadTradesFail>(
    'TRADES:LOAD_TRADES', 'TRADES:LOAD_TRADES_SUCCESS', 'TRADES:LOAD_TRADES_FAIL',
  );
