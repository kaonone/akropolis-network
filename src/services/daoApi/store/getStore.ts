import { from, merge, Observable, ConnectableObservable } from 'rxjs';
import {
  mergeScan, bufferTime, skipUntil, distinctUntilChanged, publishReplay, map,
} from 'rxjs/operators';
import { StoreReducer } from './types';
import ContractProxy from '@aragon/wrapper/dist/core/proxy';
import { EventLog } from 'web3/types';

export function getStore<S, E>(
  reducer: StoreReducer<S, E>,
  initial: S,
  proxies: ContractProxy[] = [],
  otherEvents: Array<Observable<E>> = [],
): Observable<S> {
  interface IPastEvent { past: EventLog[]; }
  interface IOtherEvent { other: EventLog[]; }
  type IAggregatedEvents = IPastEvent | IOtherEvent;

  function isPast(events: IAggregatedEvents): events is IPastEvent {
    return events && !!(events as IPastEvent).past;
  }

  function getEvents(events: IAggregatedEvents): E[] | EventLog[] {
    return isPast(events) ? events.past : events.other;
  }

  let isCompleteLoading = false;
  let loadedPastEvents = 0;

  // Wrap the reducer in another reducer that
  // allows us to execute code asynchronously
  // in our reducer. That's a lot of reducing.
  //
  // This is needed for the `mergeScan` operator.
  // Also, this supports both sync and async code
  // (because of the `Promise.resolve`).
  const wrappedReducer = (state: S, aggregatedEvents: IAggregatedEvents) => {
    const prevIsCompleteLoading = isCompleteLoading;
    if (isPast(aggregatedEvents)) {
      loadedPastEvents += 1;
      isCompleteLoading = isCompleteLoading || loadedPastEvents === proxies.length;
    }

    const events: E[] | EventLog[] = getEvents(aggregatedEvents);

    return from(
      !!events.length || (!prevIsCompleteLoading && isCompleteLoading)
        ? Promise.resolve(reducer(state, events, isCompleteLoading))
        : [state],
    );
  };

  const pastEvents$ = merge(
    ...proxies.map(
      proxy => from(proxy.contract.getPastEvents('allEvents', { fromBlock: proxy.initializationBlock })),
    ),
  ).pipe(
    map(events => ({ past: events })),
  );

  const otherEvents$ = getEventsStream(merge(
    ...otherEvents,
    ...proxies.map(proxy => proxy.events(undefined, {})),
  ), 'other');

  const store$ = merge(pastEvents$, otherEvents$).pipe(
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
