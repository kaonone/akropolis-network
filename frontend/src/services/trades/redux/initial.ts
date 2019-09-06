import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    loading: { error: '', isRequesting: false },
    saving: { error: '', isRequesting: false },
  },
  data: {
    trades: [],
  },
};
