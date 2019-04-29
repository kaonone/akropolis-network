import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  daoCreating: makeCommunicationReducer<NS.ICreateDao, NS.ICreateDaoSuccess, NS.ICreateDaoFail>(
    'CREATE_DAO:CREATE_DAO', 'CREATE_DAO:CREATE_DAO_SUCCESS', 'CREATE_DAO:CREATE_DAO_FAIL',
    initial.communication.daoCreating,
  ),
} as ReducersMap<NS.IReduxState['communication']>);
