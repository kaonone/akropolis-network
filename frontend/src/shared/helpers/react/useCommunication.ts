import { useCallback, useState, useRef } from 'react';
import { makeCancelablePromise, ICancelablePromise } from '../makeCancelablePromise';

type Status = 'initial' | 'pending' | 'success' | 'error' | 'canceled';

interface ICommunicationState<T> {
  error: string;
  status: Status;
  result?: InferResult<T>;
  execute(...args: InferArgs<T>): void;
  cancelRequest(): void;
  resetState(): void;
}

type InferResult<E> = E extends (...args: any[]) => Promise<infer R> ? R : never;
type InferArgs<E> = E extends (...args: infer A) => Promise<any> ? A : never;

interface IOptions<E> {
  defaultResult?: InferResult<E>;
  resetStateOnExecute?: boolean;
}

export default function useCommunication<E extends (...args: any[]) => Promise<any>>(
  effect: E, inputs: any[], options: IOptions<E> = {},
): ICommunicationState<E> {
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('initial');
  const [result, setResult] = useState<InferResult<E> | undefined>(options.defaultResult);

  const launchedCommunicationRef = useRef<ICancelablePromise<InferResult<E>> | null>(null);

  const cancelRequest = useCallback((setStatusCanceled: boolean = true) => {
    launchedCommunicationRef.current && launchedCommunicationRef.current.cancel();
    setStatusCanceled && setStatus('canceled');
  }, []);

  const resetState = useCallback(() => {
    setStatus('initial');
    setError('');
    setResult(undefined);
    launchedCommunicationRef.current = null;
  }, []);

  const execute = useCallback((...args: InferArgs<E>) => {
    cancelRequest(false);
    options.resetStateOnExecute && resetState();
    setStatus('pending');

    const communication = makeCancelablePromise<InferResult<E>>(effect(...args));
    launchedCommunicationRef.current = communication;

    communication.promise
      .then(res => {
        setStatus('success');
        setResult(res);
      })
      .catch(err => {
        if (err.isCanceled) { return; }
        setStatus('error');
        setError(err.message);
      });
  }, [inputs]);

  return {
    execute,
    cancelRequest,
    resetState,
    status,
    error,
    result,
  };
}
