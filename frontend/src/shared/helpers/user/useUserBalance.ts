import { useObserver } from 'mobx-react-lite';
import BN from 'bignumber.js';

import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

export default function useUserBalance(daoApi: DaoApi) {
  const userAccountAddress = useAccountAddress();
  const financeHolders = useObserver(() => daoApi.store.finance.holders);
  return (financeHolders[userAccountAddress] || { balance: new BN(0) }).balance;
}
