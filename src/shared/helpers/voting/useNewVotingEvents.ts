import { useMemo } from 'react';
import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { IVoting } from 'shared/types/models';

import calculateVotingResult from './calculateVotingResult';
import votingTimeout from './votingTimeout';

const useNewVotingEvents = (daoApi: DaoApi, votes: IVoting[]) => {

  const connectedAccountVotes = useObserver(() => daoApi.store.voting.connectedAccountVotes);
  const canVoteConnectedAccount = useObserver(() => daoApi.store.voting.canVoteConnectedAccount);
  const voteTime = useObserver(() => daoApi.store.voting.config.voteTime);

  return useMemo(() => votes
    .filter(vote => vote.intent.type !== 'unknown')
    .filter(vote => {
      const { votingResult } = calculateVotingResult(vote);
      const { isOutdated }  = votingTimeout(vote.startDate, voteTime);
      const isNeedExecute = isOutdated && !vote.executed && votingResult === 'confirmed';
      const isNeedVote = !vote.executed && !isOutdated && connectedAccountVotes[vote.id] === 'absent';
      const canVote = canVoteConnectedAccount[vote.id];

      return canVote && (isNeedExecute || isNeedVote);
    }), [connectedAccountVotes, canVoteConnectedAccount, votes]);
};

export default useNewVotingEvents;
