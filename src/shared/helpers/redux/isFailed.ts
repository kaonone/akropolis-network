import { ICommunication } from 'shared/types/redux';

export default function isFailed<T>(comm: ICommunication<T>): boolean {
  return !comm.isRequesting && !!comm.error;
}
