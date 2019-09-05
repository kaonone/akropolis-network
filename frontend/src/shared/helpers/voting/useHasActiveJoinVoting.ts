import React from 'react';
import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

import { addressesEqual } from '../web3';
import { calculateIsRejected } from './votingStatus';

function useHasActiveJoinVoting(daoApi: DaoApi): boolean {
  const userAccountAddress = useAccountAddress();
  const votingsMap = useObserver(() => daoApi.store.voting.votings);
  const votingConfig = useObserver(() => daoApi.store.voting.config);
  const votings = React.useMemo(() => Object.values(votingsMap), [votingsMap]);

  return React.useMemo(() => {
    return !!votings
      .filter(
        vote => (
          vote.intent.type === 'joinToDao' &&
          addressesEqual(vote.intent.payload.address, userAccountAddress) &&
          !calculateIsRejected(vote, votingConfig.voteTime) &&
          !vote.executed
        ),
      ).length;
  }, [votings, userAccountAddress, votingConfig]);
}

export default useHasActiveJoinVoting;
