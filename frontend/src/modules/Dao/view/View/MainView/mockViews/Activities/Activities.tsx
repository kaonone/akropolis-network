import * as React from 'react';

import { IVoting, VotingDecision } from 'shared/types/models';
import VotingCard from 'shared/futureView/VotingCard/VotingCard';
import { usePagination } from 'shared/view/hooks';

import { StylesProps, provideStyles } from './Activities.style';

interface IOwnProps {
  votes: IVoting[];
  connectedAccountVotes: Record<string, VotingDecision>;
  canVoteConnectedAccount: Record<string, boolean>;
}

type Props = StylesProps & IOwnProps;

function Activities(props: Props) {
  const { classes, votes, connectedAccountVotes, canVoteConnectedAccount } = props;

  const { items: paginatedVotes, paginationView } = usePagination(votes);

  return (
    <div className={classes.root}>
      <div className={classes.activities}>
        {paginatedVotes.map(voting => (
          <VotingCard
            key={voting.id}
            voting={voting}
            votingDecision={connectedAccountVotes[voting.id] || 'absent'}
            canVote={canVoteConnectedAccount[voting.id] || false}
          />
        ))}
      </div>
      <div className={classes.pagination}>
        {paginationView}
      </div>
    </div>
  );
}

export default provideStyles(Activities);
