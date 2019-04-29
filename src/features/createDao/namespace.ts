import { ICommunication, IPlainAction, IAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    daoCreating: ICommunication;
  };
}

export type ICreateDao = IAction<'CREATE_DAO:CREATE_DAO', { domainName: string }>;
export type ICreateDaoSuccess = IPlainAction<'CREATE_DAO:CREATE_DAO_SUCCESS'>;
export type ICreateDaoFail = IPlainFailAction<'CREATE_DAO:CREATE_DAO_FAIL'>;

export type Action = ICreateDao | ICreateDaoSuccess | ICreateDaoFail;
