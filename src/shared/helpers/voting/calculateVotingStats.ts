import { IVoting, VotingResult } from 'shared/types/models';

export default (vote: IVoting) => {
  const { yea, nay, votingPower, supportRequired, minAcceptQuorum } = vote;

  const votedPercent = (yea + nay) / votingPower * 100;
  const yeaPercent = yea / (yea + nay) * 100;
  const nayPercent = nay / (yea + nay) * 100;

  const yeaPercentByPower = yea / (votingPower) * 100;
  const nayPercentByPower = nay / (votingPower) * 100;
  const currentResult: VotingResult = yeaPercent >= supportRequired && votedPercent >= minAcceptQuorum
    ? 'confirmed'
    : 'rejected';

  return { votedPercent, yeaPercent, nayPercent, yeaPercentByPower, nayPercentByPower, currentResult };
};
