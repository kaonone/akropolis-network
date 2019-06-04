import { useObserver } from 'mobx-react-lite';
import * as R from 'ramda';

import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

import { addressesEqual } from './web3';
import { IVoting } from 'shared/types/models';

export default function useLastConfirmedJoinVoting(daoApi: DaoApi): IVoting | null {
  const votes = useObserver(() => daoApi.store.voting.votings);
  const userAccountAddress = useAccountAddress();

  return Object.values(votes)
    .filter(vote => (
      vote.intent.type === 'joinToDao' &&
      addressesEqual(vote.intent.payload.address, userAccountAddress) &&
      vote.executed
    ))
    .sort(R.ascend(R.prop('startDate')))[0] || null;
}
