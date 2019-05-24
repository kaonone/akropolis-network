import * as React from 'react';
import VotingCard, { mockVote } from 'shared/futureView/VotingCard/VotingCard';

import { StylesProps, provideStyles } from './Activities.style';

function Activities(props: StylesProps) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <VotingCard {...mockVote} />
      <VotingCard {...mockVote} votingDecision="for" />
      <VotingCard {...mockVote} votingDecision="against" />
      <VotingCard<'join'> {...mockVote} type="join" votingParams={{ address: '0x1a5basdasdasdasdasd77a2' }} />
      <VotingCard<'deposit'> {...mockVote} votingDecision="against" type="deposit" votingParams={{ withdraw: 120 }} />
      <VotingCard {...mockVote} votingResult="approved" />
      <VotingCard {...mockVote} votingResult="declined" />
    </div>
  );
}

export default provideStyles(Activities);
