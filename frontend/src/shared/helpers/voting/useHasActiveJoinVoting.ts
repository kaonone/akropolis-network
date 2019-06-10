import React from 'react';
import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { IVoting } from 'shared/types/models';
import { useAccountAddress } from 'services/user';

import { addressesEqual } from '../web3';
import { calculateIsRejected } from './votingStatus';

const useHasActiveJoinVoting = (daoApi: DaoApi, votes: IVoting[]) => {

  const userAccountAddress = useAccountAddress();
  const votingConfig = useObserver(() => daoApi.store.voting.config);

  const hasActiveJoinVoting: boolean = React.useMemo(() => {
    return !!votes
      .filter(
        vote => (
          vote.intent.type === 'joinToDao' &&
          addressesEqual(vote.intent.payload.address, userAccountAddress) &&
          !calculateIsRejected(vote, votingConfig.voteTime) &&
          !vote.executed
        ),
      ).length;
  }, [votes, userAccountAddress, votingConfig]);

  return hasActiveJoinVoting;
};

export default useHasActiveJoinVoting;
