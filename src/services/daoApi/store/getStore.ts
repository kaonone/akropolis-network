import { from, merge, Observable, ConnectableObservable } from 'rxjs';
import {
  mergeScan, bufferTime, skipUntil, distinctUntilChanged, publishReplay, map,
} from 'rxjs/operators';
import { StoreReducer } from './types';

export function getStore<S, E>(
  reducer: StoreReducer<S, E>,
  initial: S,
  awaitableEvents: Array<Observable<E>> = [],
  otherEvents: Array<Observable<E>> = [],
): Observable<S> {
  type IAggregatedEvents = { awaitable: E[] } | { other: E[] };

  function isAwaitable(events: IAggregatedEvents): events is ({ awaitable: E[] }) {
    return events && (events as any).awaitable;
  }

  function getEvents(events: IAggregatedEvents): E[] {
    return isAwaitable(events) ? events.awaitable : events.other;
  }

  let isCompleteLoading = false;

  // Wrap the reducer in another reducer that
  // allows us to execute code asynchronously
  // in our reducer. That's a lot of reducing.
  //
  // This is needed for the `mergeScan` operator.
  // Also, this supports both sync and async code
  // (because of the `Promise.resolve`).
  const wrappedReducer = (state: S, aggregatedEvents: IAggregatedEvents) => {
    const prevIsCompleteLoading = isCompleteLoading;
    if (isAwaitable(aggregatedEvents)) {
      isCompleteLoading = isCompleteLoading || !aggregatedEvents.awaitable.length;
    }

    const events: E[] = getEvents(aggregatedEvents);

    return from(
      !!events.length || (!prevIsCompleteLoading && isCompleteLoading)
        ? Promise.resolve(reducer(state, events, isCompleteLoading))
        : [state],
    );
  };

  const awaitableEvents$ = getEventsStream(merge(...awaitableEvents), 'awaitable');
  const otherEvents$ = getEventsStream(merge(...otherEvents), 'other');
  const store$ = merge(awaitableEvents$, otherEvents$).pipe(
    mergeScan(wrappedReducer, initial, 1),
    distinctUntilChanged(),
    publishReplay(1),
  );

  (store$ as ConnectableObservable<S>).connect();

  return store$;
}

function getEventsStream<T, K extends string>(flatEvents$: Observable<T>, key: K): Observable<{ [k in K]: T[] }> {
  return flatEvents$.pipe(
    bufferTime(300),
    skipUntil(flatEvents$),
    map(bufferedEvents => ({ [key]: bufferedEvents })),
  );
}
