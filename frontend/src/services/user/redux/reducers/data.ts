import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'USER:CHECK_IS_USER_SIGNED_FAIL':
    case 'USER:CHECK_IS_USER_SIGNED_SUCCESS': {
      return {
        ...state,
        isCheckedAuth: true,
      };
    }
    case 'USER:COMPLETE_AUTHENTICATION': {
      return {
        ...state,
        confirmedAddress: action.payload.address,
        isLogged: true,
        isCheckedAuth: true,
      };
    }
    case 'USER:CHANGE_USER':
    case 'USER:LOGOUT': {
      return {
        ...initial.data,
        isCheckedAuth: true,
      };
    }
    default: return state;
  }
}
