import { put, call, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { storageKeys } from 'services/storage';
import { IDependencies } from 'shared/types/app';
import { IAirSwapOrder } from 'shared/types/models';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../../namespace';
import * as actions from '../actions';
import * as selectors from '../selectors';

const saveTradesType: NS.ISaveTrades['type'] = 'TRADES:SAVE_TRADES';
const loadTradesType: NS.ILoadTrades['type'] = 'TRADES:LOAD_TRADES';
const addTradeType: NS.IAddTrade['type'] = 'TRADES:ADD_TRADE';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeEvery(addTradeType, addTradeSaga);
    yield takeLatest(saveTradesType, saveTradesSaga, deps);
    yield takeLatest(loadTradesType, loadTradesSaga, deps);
    yield put(actions.loadTrades());
  };
}

export function* addTradeSaga(action: NS.IAddTrade) {
  const prevTrades: ReturnType<typeof selectors.selectTrades> = yield select(selectors.selectTrades);
  const trades: IAirSwapOrder[] = prevTrades
    .filter(item => (item.expiry * 1000) < Date.now())
    .concat(action.payload);
  yield put(actions.saveTrades(trades));
}

export function* saveTradesSaga({ storage }: IDependencies, action: NS.ISaveTrades) {
  const trades = action.payload;
  try {
    yield call([storage, storage.set], storageKeys.trades, trades);
    yield put(actions.saveTradesSuccess());
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.saveTradesFail(message));
  }
}

export function* loadTradesSaga({ storage }: IDependencies, _action: NS.ILoadTrades) {
  try {
    const trades: IAirSwapOrder[] | null = yield call([storage, storage.get], storageKeys.trades);
    yield put(actions.loadTradesSuccess(trades || []));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.loadTradesFail(message));
  }
}

export { getSaga };
