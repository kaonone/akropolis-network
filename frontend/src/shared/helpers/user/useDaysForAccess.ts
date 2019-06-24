import * as React from 'react';
import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

import getWaitingAccessDays from '../getWaitingAccessDays';

export default function useDaysForAccess(daoApi: DaoApi) {
  const tokenMints = useObserver(() => daoApi.store.tokenManager.tokenMints);
  const userAccountAddress = useAccountAddress();

  return tokenMints[userAccountAddress] && React.useMemo(
    () => getWaitingAccessDays(tokenMints[userAccountAddress].startDate),
    [tokenMints[userAccountAddress].startDate],
  );
}
