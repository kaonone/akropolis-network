import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { IVoting } from 'shared/types/models';

import getVotingResult from './getVotingResult';
import isEndedByTimeout from './isEndedByTimeout';

const useNewVotingEvents = (daoApi: DaoApi, votes: IVoting[]) => {

  const connectedAccountVotes = useObserver(() => daoApi.store.voting.connectedAccountVotes);
  const canVoteConnectedAccount = useObserver(() => daoApi.store.voting.canVoteConnectedAccount);

  return votes
    .filter(vote => vote.intent.type !== 'unknown')
    .filter(vote => {
      const voteResult = getVotingResult(vote);
      const isOutdated = isEndedByTimeout(vote);
      const isNeedExecute = isOutdated && !vote.executed && voteResult === 'confirmed';
      const isNeedVote = !vote.executed && !isOutdated && connectedAccountVotes[vote.id] === 'absent';
      const canVote = canVoteConnectedAccount[vote.id];

      return canVote && (isNeedExecute || isNeedVote);
    });
};

export default useNewVotingEvents;
