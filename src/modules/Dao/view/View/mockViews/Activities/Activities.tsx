import * as React from 'react';
import VotingCard, { mockVote } from 'shared/futureView/VotingCard/VotingCard';

// import { StylesProps, provideStyles } from './Compound.style';


function Activities(props: StylesProps) {
  const { classes } = props;
  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}><VotingCard {...mockVote} /></div>
      <div style={{ marginBottom: '0.5rem' }}><VotingCard {...mockVote} votingDecision="for" /></div>
      <div style={{ marginBottom: '0.5rem' }}><VotingCard {...mockVote} votingDecision="against" /></div>
      <div style={{ marginBottom: '0.5rem' }}>
        <VotingCard<'join'> {...mockVote} type="join" votingParams={{ address: '0x1a5basdasdasdasdasd77a2' }} />
      </div>
    </div>
  );
}

export default Activities;
