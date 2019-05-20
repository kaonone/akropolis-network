import * as NS from '../../namespace';

export function setProgress(progress: NS.Progress): NS.ISetProgress {
  return {
    type: 'CREATE_DAO:SET_PROGRESS',
    payload: { progress },
  };
}

export * from './communication';
