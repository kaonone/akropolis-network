import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

import { addressesEqual } from './web3';

export default (daoApi: DaoApi) => {
  const votes = useObserver(() => daoApi.store.voting.votings);
  const userAccountAddress = useAccountAddress();

  return Object.values(votes)
    .filter(vote => (
      vote.intent.type === 'joinToDao' &&
      addressesEqual(vote.intent.payload.address, userAccountAddress) &&
      vote.executed
    ))[0];
};
