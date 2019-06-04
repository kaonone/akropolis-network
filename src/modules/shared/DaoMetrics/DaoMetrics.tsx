import * as React from 'react';
import * as cn from 'classnames';

import { formatPercent, formatDAI } from 'shared/helpers/format';
import { Increase, Decrease } from 'shared/view/elements/Icons';
import { tKeys as tkeysAll, useTranslate } from 'services/i18n';

import { Grid, Typography } from 'shared/view/elements';

import { provideStyles, StylesProps } from './DaoMetrics.style';

const tKeys = tkeysAll.modules.daos;

function getType(value: number): ChangeType {
  if (!Number.isFinite(value)) {
    return 'infinite';
  }
  return value < 0 ? 'decrease' : 'increase';
}

type ChangeType = 'increase' | 'decrease' | 'infinite';

interface IMetric {
  title: string;
  value: string;
  type?: ChangeType;
  percent?: string;
}
interface IOwnProps {
  balance: number;
  balanceChange: number;
  deposit: number;
  depositChange: number;
  withdraw: number;
  withdrawChange: number;
}
type IProps = IOwnProps & StylesProps;

const DaoMetrics = (props: IProps) => {
  const { classes, balance, balanceChange, deposit, depositChange, withdraw, withdrawChange } = props;

  const { t } = useTranslate();
  const metrics: IMetric[] = [
    {
      title: t(tKeys.balance.getKey()),
      value: formatDAI(balance),
      type: getType(balanceChange),
      percent: formatPercent(Math.abs(balanceChange), 2),
    },
    {
      title: t(tKeys.deposit.getKey()),
      value: formatDAI(deposit),
      type: getType(depositChange),
      percent: formatPercent(Math.abs(depositChange), 2),
    },
    {
      title: t(tKeys.withdraw.getKey()),
      value: formatDAI(withdraw),
      type: getType(withdrawChange),
      percent: formatPercent(Math.abs(withdrawChange), 2),
    },
  ];
  return (
    <Grid container wrap="nowrap" alignItems="center" className={classes.root}>
      {metrics.map((metric, i) => (
        <Grid key={i} item className={classes.metric}>
          <Typography variant="overline" className={classes.title}>{metric.title}</Typography>
          <Grid container wrap="nowrap" alignItems="baseline">
            <Typography weight="medium" variant="h6" className={classes.value}>{metric.value}</Typography>
            {metric.type && metric.type !== 'infinite' &&
              <>
                {metric.type === 'increase' && <Increase className={cn(classes.arrowIcon, classes.increase)} />}
                {metric.type === 'decrease' && <Decrease className={cn(classes.arrowIcon, classes.decrease)} />}
                <Typography
                  weight="medium"
                  variant="body2"
                  className={cn({
                    [classes.increase]: metric.type === 'increase',
                    [classes.decrease]: metric.type === 'decrease',
                  })}
                >
                  {metric.percent}
                </Typography>
              </>}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export { IProps };
export default provideStyles(DaoMetrics);
