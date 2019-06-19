import * as moment from 'moment';
import * as R from 'ramda';

import { TOTAL_WAITING_DAYS_FOR_ACCESS } from 'core/constants';

const getWaitingAccessDays = (startDate: number) => {
  const dayPassed = R.clamp(
    0, TOTAL_WAITING_DAYS_FOR_ACCESS, Math.ceil(moment().diff(moment(startDate), 'days', true)));
  const dayLeft = TOTAL_WAITING_DAYS_FOR_ACCESS - dayPassed;
  return { dayLeft, dayPassed };
};

export default getWaitingAccessDays;
