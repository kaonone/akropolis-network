import React from 'react';
import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { WithdrawIntent } from 'shared/types/models';
import { useAccountAddress } from 'services/user';

import { addressesEqual } from '../web3';
import { calculateIsRejected } from './votingStatus';

const useActiveWithdraws = (daoApi: DaoApi): number => {
  const userAccountAddress = useAccountAddress();
  const votes = useObserver(() => daoApi.store.voting.votings);

  const votingConfig = useObserver(() => daoApi.store.voting.config);

  return React.useMemo(() => {
    return Object.values(votes)
      .filter(
        (vote) => (
          vote.intent.type === 'withdrawRequest' &&
          addressesEqual(vote.intent.payload.to, userAccountAddress) &&
          !calculateIsRejected(vote, votingConfig.voteTime) &&
          !vote.executed
        ))
      .reduce((acc, curr) => acc + (curr.intent as WithdrawIntent).payload.amount, 0);
  }, [votes, userAccountAddress, votingConfig]);

};

export default useActiveWithdraws;
