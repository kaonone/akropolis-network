import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';

import { useAccountAddress } from './useAccountAddress';

export function useIsMember(daoApi: DaoApi) {
  const userAccountAddress = useAccountAddress();
  const tokenHolders = useObserver(() => daoApi.store.tokenManager.holders);
  return !!tokenHolders[userAccountAddress];
}
