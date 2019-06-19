import React from 'react';
import BigNumber from 'bignumber.js';
import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { TransferIntent } from 'shared/types/models';
import { useAccountAddress } from 'services/user';

import { addressesEqual } from '../web3';
import { calculateIsRejected } from './votingStatus';

const useActiveWithdraws = (daoApi: DaoApi): BigNumber => {
  const userAccountAddress = useAccountAddress();
  const votes = useObserver(() => daoApi.store.voting.votings);

  const votingConfig = useObserver(() => daoApi.store.voting.config);

  return React.useMemo(() => {
    return Object.values(votes)
      .filter(
        (vote) => (
          vote.intent.type === 'transfer' &&
          addressesEqual(vote.intent.payload.to, userAccountAddress) &&
          !calculateIsRejected(vote, votingConfig.voteTime) &&
          !vote.executed
        ))
      .reduce((acc, curr) => acc.plus((curr.intent as TransferIntent).payload.amount), new BigNumber(0));
  }, [votes, userAccountAddress, votingConfig]);

};

export default useActiveWithdraws;
