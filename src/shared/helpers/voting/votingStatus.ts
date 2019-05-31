import { IVoting, VotingStatus } from 'shared/types/models';

import calculateVotingStats from './calculateVotingStats';
import votingTimeout from './votingTimeout';
import { IVotingState } from 'services/daoApi/store/types';
import { useObserver } from 'mobx-react-lite';
import { DaoApi } from 'services/daoApi';

type VotingStateFields = Pick<IVotingState, 'connectedAccountVotes' | 'canVoteConnectedAccount' | 'config'>;

export const useVotingStatus = (daoApi: DaoApi, vote: IVoting) => {
  const votingStateFields = useFieldsForVotingStatus(daoApi);
  return getVotingStatus(votingStateFields, vote);
};

export const useFieldsForVotingStatus = (daoApi: DaoApi): VotingStateFields => {

  const connectedAccountVotes = useObserver(() => daoApi.store.voting.connectedAccountVotes);
  const canVoteConnectedAccount = useObserver(() => daoApi.store.voting.canVoteConnectedAccount);
  const config = useObserver(() => daoApi.store.voting.config);
  return { connectedAccountVotes, canVoteConnectedAccount, config };
};

export const getVotingStatus = (votingState: VotingStateFields, vote: IVoting): VotingStatus => {
  const { supportRequired } = vote;

  const { connectedAccountVotes, canVoteConnectedAccount, config } = votingState;

  const canVote = canVoteConnectedAccount[vote.id];

  const votingDecision = connectedAccountVotes[vote.id];

  const { currentResult, nayPercent } = calculateVotingStats(vote);

  const { isOutdated } = votingTimeout(vote.startDate, config.voteTime);

  const isEndedNotConfirmed = isOutdated && currentResult === 'rejected';

  const isRejectAdvanced = nayPercent > (100 - supportRequired);

  if (vote.executed) {
    return 'confirmed';
  }

  if (isEndedNotConfirmed || isRejectAdvanced) {
    return 'rejected';
  }

  if (isOutdated && !vote.executed && currentResult === 'confirmed') {
    return 'execute-needed';
  }

  if (canVote && votingDecision === 'absent') {
    return 'vote-needed';
  }

  return 'pending';
};
