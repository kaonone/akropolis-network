import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'TRADES:SAVE_TRADES':
    case 'TRADES:LOAD_TRADES_SUCCESS': {
      return {
        ...state,
        trades: action.payload,
      };
    }
    default: return state;
  }
}
