import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

export default function useUserBalance(daoApi: DaoApi) {
  const userAccountAddress = useAccountAddress();
  const financeHolders = useObserver(() => daoApi.store.finance.holders);
  return (financeHolders[userAccountAddress] || { balance: 0 }).balance;
}
