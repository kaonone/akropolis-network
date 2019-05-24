import { EventLog } from 'web3/types';
import { from, merge, Observable } from 'rxjs';
import { mergeScan, bufferTime, skipUntil, distinctUntilChanged } from 'rxjs/operators';
import { StoreReducer } from './types';

export function getStore<S>(
  reducer: StoreReducer<S>, initial: S, events: Array<Observable<EventLog>> = [],
): Observable<S> {
  let isCompleteLoading: boolean = false;

  // Wrap the reducer in another reducer that
  // allows us to execute code asynchronously
  // in our reducer. That's a lot of reducing.
  //
  // This is needed for the `mergeScan` operator.
  // Also, this supports both sync and async code
  // (because of the `Promise.resolve`).
  const wrappedReducer = (state: S, bufferedEvents: EventLog[]) => {
    const prevIsCompleteLoading = isCompleteLoading;
    isCompleteLoading = isCompleteLoading || !bufferedEvents.length;
    return from(
      !!bufferedEvents.length || (!prevIsCompleteLoading && isCompleteLoading)
        ? Promise.resolve(reducer(state, bufferedEvents, isCompleteLoading))
        : [state],
    );
  };

  const events$ = merge(...events);

  return events$.pipe(
    bufferTime(300),
    skipUntil(events$),
    mergeScan(wrappedReducer, initial, 1),
    distinctUntilChanged(),
  );
}
