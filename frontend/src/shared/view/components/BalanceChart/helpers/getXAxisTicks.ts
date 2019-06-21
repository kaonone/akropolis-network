import * as d3Scale from 'd3-scale';
import * as d3Time from 'd3-time';
import * as moment from 'moment';

import { Period } from '../BalanceChart';

export function getXAxisTicks(
  floatPeriod: Period,
  min: number,
  max: number,
): number[] {
  const domain = [min, max];
  const scale = d3Scale.scaleTime().domain(domain);
  const ticks = (() => {
    const diffInMonths = moment(max).diff(min, 'months');

    const dateMin = new Date(min);
    const dateMax = new Date(max);

    switch (floatPeriod) {
      case '24h':
        return scale.ticks(d3Time.timeHour.every(1) as any);
      case '1w':
        return scale.ticks(d3Time.timeDay.every(1) as any);
      case '1m':
        return d3Time.timeDay.range(dateMin, dateMax, 1);
      case '6m':
        return d3Time.timeMonth.range(dateMin, dateMax, 1);
      case 'all':
        return d3Time.timeMonth.range(dateMin, dateMax, diffInMonths > 6 ? Math.round(diffInMonths / 3) : 1);
      default:
        return scale.ticks(d3Time.timeDay.every(1) as any);
    }
  })();
  return ticks.map(tick => tick.getTime());
}
