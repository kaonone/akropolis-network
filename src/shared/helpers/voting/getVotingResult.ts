import { IVoting } from 'shared/types/models';

function getVotingResult(vote: IVoting) {
  const { yea, nay, votingPower, supportRequired, minAcceptQuorum} = vote;
  const votedPercent = (yea + nay) / votingPower * 100;
  const yeaPercent = yea / (yea + nay) * 100;
  return yeaPercent >= supportRequired && votedPercent >= minAcceptQuorum
    ? 'confirmed'
    : 'rejected';
}

export default getVotingResult;
