import { useObserver } from 'mobx-react-lite';
import { useMemo } from 'react';
import * as R from 'ramda';

import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

import { addressesEqual } from './web3';
import { IVoting } from 'shared/types/models';

export default function useFirstConfirmedJoinVoting(daoApi: DaoApi): IVoting | null {
  const votes = useObserver(() => daoApi.store.voting.votings);
  const userAccountAddress = useAccountAddress();

  return useMemo(() => (
    Object.values(votes)
      .filter(vote => (
        vote.intent.type === 'joinToDao' &&
        addressesEqual(vote.intent.payload.address, userAccountAddress) &&
        vote.executed
      ))
      .sort(R.ascend(R.prop('startDate')))[0] || null),
    [votes, userAccountAddress]);
}
