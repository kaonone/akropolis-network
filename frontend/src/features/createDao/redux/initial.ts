import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    daoCreating: {
      error: '',
      isRequesting: false,
    },
  },
  progress: 'initial',
  createdDao: '',
};
