import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { DaoApi } from 'services/daoApi';
import { useIsMember } from 'services/user';

import { IVoting } from 'shared/types/models';
import { useFieldsForVotingStatus, getVotingStatus } from './votingStatus';

function useNewVotingEvents(daoApi: DaoApi): IVoting[] {
  const votingsMap = useObserver(() => daoApi.store.voting.votings);
  const votings = React.useMemo(() => Object.values(votingsMap), [votingsMap]);
  const votingStateFields = useFieldsForVotingStatus(daoApi);
  const isMember = useIsMember(daoApi);

  return React.useMemo(() => !isMember ? [] : votings
    .filter(vote => vote.intent.type !== 'unknown')
    .filter(vote => {
      const votingStatus = getVotingStatus(votingStateFields, vote);
      return votingStatus === 'vote-needed' || votingStatus === 'execute-needed';
    }), [votings, votingStateFields]);
}

export default useNewVotingEvents;
