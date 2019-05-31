import * as moment from 'moment';

import { IVoting } from 'shared/types/models';

function isEndedByTimeout(vote: IVoting) {

  const timeLeft = moment(vote.startDate).add(24, 'hours').diff(Date.now());
  return timeLeft <= 0;
}

export default isEndedByTimeout;
