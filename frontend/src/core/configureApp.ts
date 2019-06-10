import configureDeps from './configureDeps';
import { TYPES, container } from './configureIoc';
import configureStore, { createReducer } from './configureStore';
import { configureJss } from 'core/configureJss';

import { DaoModule } from 'modules';
import { reduxEntry as adaptabilityRE } from 'services/adaptability';
import { reduxEntry as i18nRE } from 'services/i18n';
import { reduxEntry as userRE } from 'services/user';
import { reduxEntry as notificationRE } from 'services/notifications';

import { reduxEntry as signInRE } from 'features/signIn';

import { ReducersMap } from 'shared/types/redux';
import { IAppData, IModule, RootSaga, IAppReduxState, IReduxEntry } from 'shared/types/app';

function configureApp(data?: IAppData): IAppData {
  /* Prepare main app elements */
  const modules: IModule[] = [
    DaoModule,
  ];

  if (data) {
    return { ...data, modules };
  }

  const sharedReduxEntries: IReduxEntry[] = [
    adaptabilityRE,
    i18nRE,
    notificationRE,
    signInRE,
    userRE,
  ];

  const connectedSagas: RootSaga[] = [];
  let connectedReducers: NonNullable<IReduxEntry['reducers']> = {};

  const { runSaga, store } = configureStore();
  try {
    container.getAll(TYPES.Store);
    container.rebind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.rebind(TYPES.Store).toConstantValue(store);
  } catch {
    container.bind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.bind(TYPES.Store).toConstantValue(store);
  }

  const dependencies = configureDeps(store);
  const jssDeps = configureJss();

  sharedReduxEntries.forEach(connectEntryToStore);
  modules.forEach((module: IModule) => {
    if (module.getReduxEntry) {
      connectEntryToStore(module.getReduxEntry());
    }
  });

  function connectEntryToStore({ reducers, sagas }: IReduxEntry) {
    if (!store) {
      throw new Error('Cannot find store, while connecting module.');
    }

    if (reducers) {
      const keys = Object.keys(reducers) as Array<keyof typeof reducers>;
      const isNeedReplace = keys.some(key => !connectedReducers[key]);
      connectedReducers = { ...connectedReducers, ...reducers };

      if (isNeedReplace) {
        store.replaceReducer(createReducer(connectedReducers as ReducersMap<IAppReduxState>));
      }
    }

    if (sagas && __CLIENT__) {
      sagas.forEach((saga: RootSaga) => {
        if (!connectedSagas.includes(saga) && runSaga) {
          runSaga(saga(dependencies));
          connectedSagas.push(saga);
        }
      });
    }
  }

  return { modules, store, jssDeps, drizzle: dependencies.drizzle, deps: dependencies };
}

export default configureApp;
