import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  saving: makeCommunicationReducer<NS.ISaveTrades, NS.ISaveTradesSuccess, NS.ISaveTradesFail>(
    'TRADES:SAVE_TRADES', 'TRADES:SAVE_TRADES_SUCCESS', 'TRADES:SAVE_TRADES_FAIL',
    initial.communication.saving,
  ),
  loading: makeCommunicationReducer<NS.ILoadTrades, NS.ILoadTradesSuccess, NS.ILoadTradesFail>(
    'TRADES:LOAD_TRADES', 'TRADES:LOAD_TRADES_SUCCESS', 'TRADES:LOAD_TRADES_FAIL',
    initial.communication.loading,
  ),
} as ReducersMap<NS.IReduxState['communication']>);
