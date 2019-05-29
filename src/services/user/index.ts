import { IReduxEntry } from 'shared/types/app';
import * as namespace from './namespace';
import { actions, selectors, reducer, getSaga } from './redux';

export * from './containers';
export * from './hooks';
export { currentAddress$, getCurrentAccount } from './common';
export { namespace, selectors, actions };

export const reduxEntry: IReduxEntry = {
  reducers: { user: reducer },
  sagas: [getSaga],
};
