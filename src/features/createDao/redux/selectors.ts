import { IAppReduxState } from 'shared/types/app';
import { makeCommunicationSelector } from 'shared/helpers/redux';

import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.createDao;
}

export function selectProgress(state: IAppReduxState): NS.Progress {
  return selectState(state).progress;
}

export function selectCreatedDao(state: IAppReduxState): string {
  return selectState(state).createdDao;
}

export const selectCommunication = makeCommunicationSelector(selectState);
