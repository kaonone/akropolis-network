import { DaoApi } from 'services/daoApi';
import { IVoting } from 'shared/types/models';
import { useIsMember } from 'services/user';

import { useFieldsForVotingStatus, getVotingStatus } from './votingStatus';

const useNewVotingEvents = (daoApi: DaoApi, votes: IVoting[]) => {
  const votingStateFields = useFieldsForVotingStatus(daoApi);
  const isMember = useIsMember(daoApi);

  return votes
    .filter(vote => vote.intent.type !== 'unknown')
    .filter(vote => {
      const votingStatus = getVotingStatus(votingStateFields, vote);
      return isMember && (votingStatus === 'vote-needed' || votingStatus === 'execute-needed');
    });
};

export default useNewVotingEvents;
