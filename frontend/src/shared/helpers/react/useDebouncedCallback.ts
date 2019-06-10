import { useCallback, useEffect, useRef } from 'react';

export default function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  deps: ReadonlyArray<any>,
  options: { maxWait?: number } = {},
): [T, () => void, () => void] {
  const { maxWait } = options;
  const maxWaitHandler = useRef(0);
  const maxWaitArgs = useRef<any[]>([]);
  const functionTimeoutHandler = useRef(0);
  const isComponentUnmounted = useRef(false);

  const debouncedFunction = useCallback(callback, deps);

  const cancelDebouncedCallback = useCallback(() => {
    clearTimeout(functionTimeoutHandler.current);
    clearTimeout(maxWaitHandler.current);
    maxWaitHandler.current = 0;
    maxWaitArgs.current = [];
    functionTimeoutHandler.current = 0;
  }, [functionTimeoutHandler.current, maxWaitHandler.current]);

  useEffect(
    () => () => {
      // we use flag, as we allow to call callPending outside the hook
      isComponentUnmounted.current = true;
    },
    [],
  );

  const debouncedCallback = useCallback<T>(
    ((...args: any[]) => {
      maxWaitArgs.current = args;
      clearTimeout(functionTimeoutHandler.current);
      functionTimeoutHandler.current = window.setTimeout(() => {
        if (!isComponentUnmounted.current) {
          debouncedFunction(...args);
        }

        cancelDebouncedCallback();
      }, delay);

      if (maxWait && !maxWaitHandler.current) {
        maxWaitHandler.current = window.setTimeout(() => {
          if (!isComponentUnmounted.current) {
            debouncedFunction(...maxWaitArgs.current);
          }
          cancelDebouncedCallback();
        }, maxWait);
      }
    }) as T,
    [debouncedFunction, maxWait, delay],
  );

  const callPending = () => {
    // Call pending callback only if we have anything in our queue
    if (!functionTimeoutHandler.current) {
      return;
    }

    debouncedFunction(...maxWaitArgs.current);
    cancelDebouncedCallback();
  };

  // For the moment, we use 3 args array so that we save backward compatibility
  return [debouncedCallback, cancelDebouncedCallback, callPending];
}
