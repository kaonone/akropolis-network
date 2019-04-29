import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: createDao, completed: createDaoSuccess, failed: createDaoFail } =
  makeCommunicationActionCreators<NS.ICreateDao, NS.ICreateDaoSuccess, NS.ICreateDaoFail>(
    'CREATE_DAO:CREATE_DAO', 'CREATE_DAO:CREATE_DAO_SUCCESS', 'CREATE_DAO:CREATE_DAO_FAIL',
  );
