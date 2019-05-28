import * as React from 'react';
import VotingCard, { mockVote } from 'shared/futureView/VotingCard/VotingCard';
import { usePagination } from 'shared/view/hooks';

import { StylesProps, provideStyles } from './Activities.style';

function Activities(props: StylesProps) {
  const { classes } = props;

  // tslint:disable:max-line-length
  const activities = [
    <VotingCard {...mockVote} key={1} />,
    <VotingCard {...mockVote} votingDecision="for" key={2} />,
    <VotingCard {...mockVote} votingDecision="against" key={3} />,
    <VotingCard<'join'> {...mockVote} type="join" votingParams={{ address: '0x1a5basdasdasdasdasd77a2' }} key={4} />,
    <VotingCard<'deposit'> {...mockVote} votingDecision="against" type="deposit" votingParams={{ withdraw: 120 }} key={5} />,
    <VotingCard {...mockVote} votingResult="approved" key={6} />,
    <VotingCard {...mockVote} votingResult="declined" key={7} />,
  ];
  // tslint:enable:max-line-length

  const { items: paginatedActivities, paginationView } = usePagination(activities);

  return (
    <div className={classes.root}>
      <div className={classes.activities}>
        {paginatedActivities}
      </div>
      <div className={classes.pagination}>
        {paginationView}
      </div>
    </div>
  );
}

export default provideStyles(Activities);
