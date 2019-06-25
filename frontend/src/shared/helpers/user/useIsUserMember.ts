import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

export default function useIsUserMember(daoApi: DaoApi): boolean {
  const account = useAccountAddress();
  const holders = useObserver(() => daoApi.store.tokenManager.holders);
  return !!holders[account];
}
