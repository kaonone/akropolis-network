import * as moment from 'moment';
import * as R from 'ramda';
import * as d3Scale from 'd3-scale';

import { Period, IPoint } from '../BalanceChart';

const POINTS_LENGTH = 7;

export function getTicks(points: IPoint[], selectedPeriod: Period): { ticks: IPoint[], realPeriod: Period } {
  const firstPoint = R.head(points);
  if (!firstPoint) { return { ticks: [], realPeriod: 'all' }; }

  const firstPointDateByPeriod: Record<Period, () => number> = {
    all: () => firstPoint.date,
    '24h': () => moment().subtract(1, 'day').valueOf(),
    '1w': () => moment().subtract(1, 'week').valueOf(),
    '1m': () => moment().subtract(1, 'month').valueOf(),
    '6m': () => moment().subtract(6, 'month').valueOf(),
  };

  const firstPointDate = Math.max(firstPointDateByPeriod[selectedPeriod](), firstPoint.date);
  const lastPoint: IPoint = {
    date: Date.now(),
    value: (R.last(points) || { value: 0 }).value,
  };

  const realPeriod = calculatePeriodByDuration(moment(lastPoint.date).diff(firstPointDate));
  const ticks = calculateTicks([...points, lastPoint], firstPointDate, lastPoint.date, POINTS_LENGTH);

  return { ticks, realPeriod };
}

function calculatePeriodByDuration(duration: number): Period {
  const mDuration = moment.duration(duration);
  const months = mDuration.asMonths();
  const weeks = mDuration.asWeeks();
  const days = mDuration.asDays();

  if (days <= 1) { return '24h'; }
  if (weeks <= 1) { return '1w'; }
  if (months <= 1) { return '1m'; }
  if (months <= 6) { return '6m'; }
  return 'all';
}

function calculateTicks(points: IPoint[], start: number, stop: number, length: number) {
  const scale = d3Scale.scaleLinear()
    .domain([start, stop])
    .range([0, length - 1]);

  const tickDates = Array.from(
    new Array(length),
    (_, i) => Math.floor(scale.invert(i)),
  );

  return tickDates.map(getAnyPointOnScale.bind(null, points));
}

function getAnyPointOnScale(points: IPoint[], date: number): IPoint {
  const zeroPoint = { date, value: 0 };

  if (points.length <= 1) {
    return zeroPoint;
  }

  const sorted = [...points].sort(R.ascend(R.prop('date')));

  const leftPointIndex = sorted.findIndex(
    (item, i, arr) => arr[i + 1] && (item.date <= date) && (date <= arr[i + 1].date),
  );

  const leftPoint = sorted[leftPointIndex] || zeroPoint;
  const rightPoint = sorted[leftPointIndex + 1] || zeroPoint;

  const coefficient = (date - leftPoint.date) / (rightPoint.date - leftPoint.date);
  const value = leftPoint.value + (rightPoint.value - leftPoint.value) * coefficient;

  return { date, value };
}
