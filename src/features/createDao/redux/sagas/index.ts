import { put, call, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../../namespace';
import * as actions from '../actions';
import { buildDao } from './buildDao';

const createDaoType: NS.ICreateDao['type'] = 'CREATE_DAO:CREATE_DAO';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(createDaoType, createDaoSaga, deps);
  };
}

export function* createDaoSaga(_: IDependencies, action: NS.ICreateDao) {
  const { domainName } = action.payload;
  try {
    yield call(buildDao, domainName);
    yield put(actions.createDaoSuccess());
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.createDaoFail(message));
  }
}

export { getSaga };
