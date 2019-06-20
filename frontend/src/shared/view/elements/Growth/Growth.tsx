import * as React from 'react';
import * as cn from 'classnames';
import BigNumber from 'bignumber.js';

import { calculateGrowth } from 'shared/helpers/integer';
import { formatPercent } from 'shared/helpers/format';

import Typography from '../Typography/Typography';
import { Increase, Decrease } from '../Icons';
import { StylesProps, provideStyles } from './Growth.style';

interface IProps {
  previous: BigNumber;
  current: BigNumber;
  calculate?(previous: BigNumber, current: BigNumber): BigNumber;
  format?(value: BigNumber): string;
}

function Growth(props: IProps & StylesProps) {
  const { classes, current, previous, calculate, format } = props;
  const growth = (calculate || calculateGrowth)(previous, current);

  const type =
    !growth.isFinite() && 'infinite' ||
    growth.isEqualTo(0) && 'zero' ||
    growth.isGreaterThan(0) && 'increase' ||
    growth.isLessThan(0) && 'decrease' || 'infinite';

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
