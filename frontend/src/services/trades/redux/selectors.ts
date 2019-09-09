import { IAppReduxState } from 'shared/types/app';
import { makeCommunicationSelector } from 'shared/helpers/redux';

import * as NS from '../namespace';
import { IAirSwapOrder } from 'shared/types/models';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.trades;
}

export function selectTrades(state: IAppReduxState): IAirSwapOrder[] {
  return selectState(state).data.trades;
}

export const selectCommunication = makeCommunicationSelector(selectState);
