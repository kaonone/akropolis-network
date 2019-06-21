import * as React from 'react';
import * as R from 'ramda';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer } from 'recharts';

import { Button, Grid } from 'shared/view/elements';

import {
  makeFormatDateByPeriod, getDateByPeriod, getXAxisTicks, correctPeriod, roundTicksByPeriod,
} from './helpers';

import { provideStyles, StylesProps } from './BalanceChart.style';

export type Period = '24h' | '1w' | '1m' | '6m' | 'all';

export interface IPoint {
  date: number;
  value: number;
}

interface IOwnProps {
  points: IPoint[];
}

type IProps = IOwnProps & StylesProps;

function BalanceChart(props: IProps) {
  const { classes, points } = props;

  const [period, setPeriod] = React.useState<Period>('1w');

  const firstPoint = R.head(points);
  if (!firstPoint) {
    return null;
  }

  const usedPeriod: Period = React.useMemo(() => correctPeriod(firstPoint.date, period), [firstPoint.date, period]);
  const { min, max } = React.useMemo(() => getDateByPeriod(usedPeriod, firstPoint.date), [usedPeriod, firstPoint.date]);

  const ticksData = React.useMemo(
    () => points.concat([{ date: max, value: points[points.length - 1].value }]),
    [max, points[points.length - 1].value],
  );

  const ticks = React.useMemo(() => getXAxisTicks(usedPeriod, min, max), [usedPeriod, min, max]);

  const firstTick = R.head(ticksData);

  if (!firstTick) {
    return null;
  }

  const formatTick = React.useMemo(
    () => makeFormatDateByPeriod(usedPeriod, firstTick.date),
    [usedPeriod, firstTick.date],
  );

  const renderTick = React.useCallback(
    ({ x, y, payload, index, visibleTicksCount }) => {

      const display =
        visibleTicksCount > 12 &&
          (usedPeriod === '24h' || usedPeriod === '1m') &&
          index % 2 !== 0 ?
          'none' : 'block';

      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dy={16}
            textAnchor={'middle'}
            className={classes.tick}
            style={{ display }}
          >
            {formatTick(payload.value)}
          </text>
        </g>
      );
    }
    , [formatTick]);

  const roundedTicks = roundTicksByPeriod(usedPeriod, ticksData);
  return (
    <div className={classes.root}>
      <div className={classes.graphic}>
        <ResponsiveContainer>
          <LineChart data={roundedTicks} margin={{ left: 18, right: 18 }}>
            <XAxis
              dataKey="date"
              type="number"
              axisLine={false}
              interval={0}
              domain={[min, max]}
              allowDataOverflow
              ticks={ticks}
              tickSize={0}
              tick={renderTick}
            />
            <YAxis padding={{ top: 30, bottom: 1 }} hide />
            <CartesianGrid stroke="#EAE9ED" horizontal={false} />
            <Line dataKey="value" stroke="#613AAF" strokeWidth={2} dot={false} connectNulls isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <PeriodSwitch period={period} onSelect={setPeriod} />
    </div>);
}

interface IPeriodSwitchProps {
  period: Period;
  onSelect(period: Period): void;
}

const periods: Period[] = ['24h', '1w', '1m', '6m', 'all'];

const PeriodSwitch = provideStyles((props: IPeriodSwitchProps & StylesProps) => {
  const { classes, period: selectedPeriod, onSelect } = props;

  const selectPeriod = React.useCallback((period: Period) => {
    onSelect(period);
  }, [onSelect]);

  return (
    <Grid container wrap="nowrap" spacing={16} justify="space-between">
      {periods.map(period => (
        <Grid item key={period}>
          <Button
            variant="contained"
            color={period === selectedPeriod ? 'primary' : undefined}
            onClick={selectPeriod.bind(null, period)}
            className={classes.switchButton}
          >
            {period}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
});

export { IProps };
export default provideStyles(BalanceChart);
