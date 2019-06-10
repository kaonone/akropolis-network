import { put, call, takeLatest, all } from 'redux-saga/effects';
import { PromisedReturnType } from '_helpers';
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
    yield put(actions.setProgress('token-creating'));
    const [tokenPromise, daoPromise]: PromisedReturnType<typeof buildDao> = yield call(buildDao, domainName);
    yield all([
      call(function* token() {
        yield call(() => tokenPromise);
        yield put(actions.setProgress('dao-creating'));
      }),
      call(function* dao() {
        yield call(() => daoPromise);
        yield put(actions.setProgress('dao-created'));
      }),
    ]);
    yield put(actions.createDaoSuccess({ createdDao: domainName }));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.createDaoFail(message));
  }
}

export { getSaga };
