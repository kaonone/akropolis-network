import { useEffect, useMemo } from 'react';
import { useObserver } from 'mobx-react-lite';
import DaoNameUtils, {IState} from './store';

export default function useCheckDaoNameAvailability(domain: string): IState {
  const store = useMemo(() => new DaoNameUtils(), []);

  useEffect(() => {
    store.checkNameAvailability(domain);
  }, [domain]);

  return useObserver(() => (store.state));
}
