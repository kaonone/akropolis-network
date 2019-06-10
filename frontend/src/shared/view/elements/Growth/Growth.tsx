import * as React from 'react';
import * as cn from 'classnames';

import { calculateGrowth } from 'shared/helpers/integer';
import { formatPercent } from 'shared/helpers/format';

import Typography from '../Typography/Typography';
import { Increase, Decrease } from '../Icons';
import { StylesProps, provideStyles } from './Growth.style';

interface IProps {
  previous: number;
  current: number;
  calculate?(previous: number, current: number): number;
  format?(value: number): string;
}

function Growth(props: IProps & StylesProps) {
  const { classes, current, previous, calculate, format } = props;
  const growth = (calculate || calculateGrowth)(previous, current);

  const type =
    !Number.isFinite(growth) && 'infinite' ||
    growth === 0 && 'zero' ||
    growth > 0 && 'increase' ||
    growth < 0 && 'decrease' || 'infinite';

  if (type === 'infinite') { return <></>; }

  return (
    <Typography
      weight="medium"
      variant="body2"
      className={cn({
        [classes.increase]: type === 'increase' || type === 'zero',
        [classes.decrease]: type === 'decrease',
      })}
    >
      {type === 'increase' && <Increase className={cn(classes.arrowIcon, classes.increase)} />}
      {type === 'decrease' && <Decrease className={cn(classes.arrowIcon, classes.decrease)} />}
      {format ? format(growth) : formatPercent(growth, 2)}
    </Typography>
  );
}

export default provideStyles(Growth);
