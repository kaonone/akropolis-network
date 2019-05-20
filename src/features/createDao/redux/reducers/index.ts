import { combineReducers } from 'redux';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';
import { initial } from '../initial';

import { communicationReducer } from './communication';
import { composeReducers } from 'shared/helpers/redux';

export default combineReducers<NS.IReduxState>({
  communication: composeReducers([
    communicationReducer,
    (state: NS.IReduxState['communication'] = initial.communication, action: NS.Action) => {
      switch (action.type) {
        case 'CREATE_DAO:SET_PROGRESS':
          return action.payload.progress === 'initial' ? initial.communication : state;
        default:
          return state;
      }
    },
  ]),
  progress: (state: NS.IReduxState['progress'] = initial.progress, action: NS.Action) => {
    switch (action.type) {
      case 'CREATE_DAO:SET_PROGRESS':
        return action.payload.progress;
      default:
        return state;
    }
  },
  createdDao: (state: NS.IReduxState['createdDao'] = initial.createdDao, action: NS.Action) => {
    switch (action.type) {
      case 'CREATE_DAO:CREATE_DAO_SUCCESS':
        return action.payload.createdDao;
      default:
        return state;
    }
  },
} as ReducersMap<NS.IReduxState>);
