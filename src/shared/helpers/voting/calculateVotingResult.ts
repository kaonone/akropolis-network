import { IVoting, VotingResult } from 'shared/types/models';

function calculateVotingResult(vote: IVoting) {
  const { yea, nay, votingPower, supportRequired, minAcceptQuorum } = vote;

  const votedPercent = (yea + nay) / votingPower * 100;
  const yeaPercent = yea / (yea + nay) * 100;
  const yeaPercentByPower = yea / (votingPower) * 100;
  const nayPercentByPower = nay / (votingPower) * 100;
  const votingResult: VotingResult = yeaPercent >= supportRequired && votedPercent >= minAcceptQuorum
    ? 'confirmed'
    : 'rejected';

  return { votedPercent, yeaPercent, yeaPercentByPower, nayPercentByPower, votingResult };
}

export default calculateVotingResult;
