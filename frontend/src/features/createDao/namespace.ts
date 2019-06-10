import { ICommunication, IAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    daoCreating: ICommunication;
  };
  progress: Progress;
  createdDao: string;
}

export type Progress = 'initial' | 'token-creating' | 'dao-creating' | 'dao-created';

export interface ICreateFormData {
  domainName: string;
  goal: number;
  description: string;
}

export type ISetProgress = IAction<'CREATE_DAO:SET_PROGRESS', { progress: Progress }>;

export type ICreateDao = IAction<'CREATE_DAO:CREATE_DAO', ICreateFormData>;
export type ICreateDaoSuccess = IAction<'CREATE_DAO:CREATE_DAO_SUCCESS', { createdDao: string }>;
export type ICreateDaoFail = IPlainFailAction<'CREATE_DAO:CREATE_DAO_FAIL'>;

export type Action = ICreateDao | ICreateDaoSuccess | ICreateDaoFail | ISetProgress;
