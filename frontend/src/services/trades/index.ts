import * as namespace from './namespace';
import { actions, selectors, reducer, getSaga } from './redux';
import { IReduxEntry } from 'shared/types/app';

export { namespace, selectors, actions };

export const reduxEntry: IReduxEntry = {
  reducers: { trades: reducer },
  sagas: [getSaga],
};
