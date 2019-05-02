import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import { Store, Reducer, ActionCreator, Action } from 'redux';
import { SagaIterator } from 'redux-saga';
import { GenerateClassName } from 'jss';
import { Drizzle } from 'drizzle';
import { ContractWrappers, Web3ProviderEngine } from '0x.js';
import { HttpClient } from '@0x/connect';
import { Web3Wrapper } from '@0x/web3-wrapper';

import { LocalStorage } from 'services/storage';
import { DaoApi } from 'services/daoApi';
import Api from 'services/api/Api';

import * as adaptabilityNS from 'services/adaptability/namespace';
import * as i18nNS from 'services/i18n/namespace';
import * as orderbookNS from 'services/orderbook/namespace';
import * as transactionsNS from 'services/transactions/namespace';
import * as userNS from 'services/user/namespace';
import * as notificationNS from 'services/notifications/namespace';

import * as buyCashFlowNS from 'features/buyCashFlow/namespace';
import * as sellCashFlowNS from 'features/sellCashFlow/namespace';
import { namespace as createDaoNS } from 'features/createDao';
import * as signInNS from 'features/signIn/namespace';

import { JSS, Theme } from 'shared/styles';

export interface IModule {
  getRoutes?(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;
  getReduxEntry?(): IReduxEntry;
}

export interface IAppData {
  modules: IModule[];
  drizzle: Drizzle;
  store: Store<IAppReduxState>;
  jssDeps: IJssDependencies;
  deps: IDependencies;
}

export interface IJssDependencies {
  jss: JSS;
  generateClassName: GenerateClassName<any>;
  theme: Theme;
}

export interface IDependencies {
  api: Api;
  daoApi: DaoApi;
  drizzle: Drizzle;
  storage: LocalStorage;
  Ox: {
    client: HttpClient;
    contractWrappers: ContractWrappers;
    web3Wrapper: Web3Wrapper;
    providerEngine: Web3ProviderEngine;
  };
}

export type IDictionary<T, S extends keyof any = string> = {
  [key in S]: T;
};

export interface IReduxEntry {
  reducers?: { [key in keyof IAppReduxState]?: Reducer<IAppReduxState[key]> };
  sagas?: Array<(deps: IDependencies) => () => SagaIterator>;
}

export interface IFeatureEntry<
  C extends Record<keyof C, React.ReactType<any>> | void,
  A extends Record<keyof A, ActionCreator<Action>> | void,
  S extends Record<keyof S, (state: any, ...args: any[]) => any> | void,
  > extends IReduxEntry {
  actions?: A;
  selectors?: S;
  containers?: C;
}

export interface IAppReduxState {
  // services
  adaptability: adaptabilityNS.IReduxState;
  i18n: i18nNS.IReduxState;
  orderbook: orderbookNS.IReduxState;
  transactions: transactionsNS.IReduxState;
  user: userNS.IReduxState;
  notifications: notificationNS.IReduxState;
  // features
  createDao: createDaoNS.IReduxState;
  buyCashFlow: buyCashFlowNS.IReduxState;
  sellCashFlow: sellCashFlowNS.IReduxState;
  signIn: signInNS.IReduxState;
}

export type RootSaga = (deps: IDependencies) => () => SagaIterator;

export type Lang = 'en' | 'he';

export type Uid = number;

export interface IAssets {
  javascript: string[];
  styles: string[];
  favicons: CheerioElement[];
}
