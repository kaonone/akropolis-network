import * as moment from 'moment';

function votingTimeout(startDate: number, voteTime: number) {
  const timeLeft = moment(startDate).add(voteTime, 'milliseconds').diff(Date.now());
  return { isOutdated: timeLeft <= 0, timeLeft };
}

export default votingTimeout;
