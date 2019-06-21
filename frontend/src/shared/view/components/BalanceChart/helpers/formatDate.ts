import * as moment from 'moment';
import * as R from 'ramda';

import { Period, IPoint } from '../BalanceChart';

const unitTimeByPeriod: Record<Period, moment.unitOfTime.StartOf> = {
  '24h': 'hour',
  '1w': 'day',
  '1m': 'day',
  '6m': 'month',
  'all': 'month',
};

export function makeFormatDateByPeriod(period: Period, firstDate: number) {
  const monthAgo = moment(Date.now()).subtract(1, 'months').endOf('day').valueOf();
  return (date: number) => {
    const mDate = moment(date);
    const formatByPeriod: Record<Period, string> = {
      ['24h']: mDate.format('H'),
      ['1w']: mDate.format('ddd'),
      ['1m']: mDate.format('DD'),
      ['6m']: monthAgo < firstDate ? mDate.format('DD MMM') : mDate.format('MMM'),
      ['all']: mDate.format('DD MMM'),
    };
    return formatByPeriod[period];
  };
}

export function getDateByPeriod(period: Period, firstDate: number) {
  const roundedFirstDate = roundDateByPeriod(period, firstDate);
  const startDateByPeriod: Record<Period, number> = {
    '24h': moment(roundDateByPeriod('24h', Date.now())).subtract(1, 'day').endOf('hour').valueOf(),
    '1w': moment(roundDateByPeriod('1w', Date.now())).subtract(1, 'week').endOf('day').valueOf(),
    '1m': moment(roundDateByPeriod('1m', Date.now())).subtract(1, 'months').endOf('day').valueOf(),
    '6m': moment(roundDateByPeriod('6m', Date.now())).subtract(6, 'months').endOf('day').valueOf(),
    'all': moment(roundedFirstDate).startOf('day').valueOf(),
  };

  const min = startDateByPeriod[period] <= roundedFirstDate ?
    moment(roundedFirstDate).endOf(unitTimeByPeriod[period]).valueOf() : startDateByPeriod[period];

  const today = moment(roundDateByPeriod(period, Date.now()));
  const max = today.startOf(unitTimeByPeriod[period]).valueOf() + 100; // +100 need for right round
  return { min, max };
}

export function correctPeriod(firstDate: number, period: Period): Period {

  const isIntervalLessThenDay = moment(Date.now()).diff(moment(firstDate), 'day', true) <= 1;
  const isIntervalLessThenMonth = moment(Date.now()).diff(moment(firstDate), 'month', true) <= 1;

  if (isIntervalLessThenDay) {
    return '24h';
  }
  if (isIntervalLessThenMonth && (period === '6m' || period === 'all')) {
    return '1m';
  }
  return period;
}

export function roundTicksByPeriod(period: Period, ticks: IPoint[]): IPoint[] {
  const roundedTick = ticks.map(tick => {
    const date = roundDateByPeriod(period, tick.date);
    return { ...tick, date };
  }).reverse();

  return R.uniqBy(R.prop('date'), roundedTick).reverse(); // double reverse need for get last uniq point
}

function roundDateByPeriod(period: Period, time: number) {
  const date = moment(time);
  if (period === '24h') {
    return date.endOf('hour').valueOf();
  }
  if (period === '1m' || period === '1w') {
    return date.endOf('day').valueOf();
  }
  return date.endOf('month').valueOf();
}
