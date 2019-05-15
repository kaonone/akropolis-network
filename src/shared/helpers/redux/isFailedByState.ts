import { ICommunication } from 'shared/types/redux';

export default function isFailedByState<T>(prev: ICommunication<T>, next: ICommunication<T>): boolean {
  return prev.isRequesting && !next.isRequesting && !!next.error;
}
