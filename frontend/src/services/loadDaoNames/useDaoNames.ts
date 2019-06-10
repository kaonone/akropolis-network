import { useObserver } from 'mobx-react-lite';
import { store } from './store';

export function useDaoIds() {
  const daoIds = useObserver(() => store.daoIds);
  const loading = useObserver(() => store.loading);
  const retry = store.retry;

  return { daoIds, loading, retry };
}
