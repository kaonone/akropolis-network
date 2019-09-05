import React from 'react';
import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

import { calculateIsRejected } from './votingStatus';

function useHasActiveEnableDeFiVoting(daoApi: DaoApi): boolean {
  const userAccountAddress = useAccountAddress();
  const votingsMap = useObserver(() => daoApi.store.voting.votings);
  const votingConfig = useObserver(() => daoApi.store.voting.config);
  const votings = React.useMemo(() => Object.values(votingsMap), [votingsMap]);

  return React.useMemo(() => {
    return !!votings
      .filter(
        vote => (
          vote.intent.type === 'enableDeFiAccount' &&
          !calculateIsRejected(vote, votingConfig.voteTime) &&
          !vote.executed
        ),
      ).length;
  }, [votings, userAccountAddress, votingConfig]);
}

export default useHasActiveEnableDeFiVoting;
