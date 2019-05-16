import * as React from 'react';
import * as cn from 'classnames';

import { formatUSD, formatPercent } from 'shared/helpers/format';
import { Increase, Decrease } from 'shared/view/elements/Icons';
import { tKeys as tkeysAll, useTranslate } from 'services/i18n';

import { Grid, Typography } from 'shared/view/elements';

import { provideStyles, StylesProps } from './DaoMetrics.style';

const tKeys = tkeysAll.modules.daos;

interface IMetric {
  title: string;
  value: string;
  type?: 'increase' | 'decrease';
  percent?: string;
}
interface IOwnProps {
  balance: number;
  debit: number;
  increase: number;
  decrease: number;
  credit?: number;
}
type IProps = IOwnProps & StylesProps;

const DaoMetrics = (props: IProps) => {
  const { classes, balance, increase, debit, decrease } = props;

  const { t } = useTranslate();
  const metrics: IMetric[] = [
    {
      title: t(tKeys.balance.getKey()),
      value: formatUSD(balance),
      type: 'increase',
      percent: formatPercent(increase, 2),
    },
    {
      title: t(tKeys.debit.getKey()),
      value: formatUSD(debit),
      type: 'decrease',
      percent: formatPercent(decrease, 2),
    },
    { title: t(tKeys.credit.getKey()), value: formatUSD(0) },
  ];
  return (
    <Grid container wrap="nowrap" alignItems="center" className={classes.root}>
      {metrics.map(metric => (
        <Grid item className={classes.metric}>
          <Typography variant="overline" className={classes.title}>{metric.title}</Typography>
          <Grid container wrap="nowrap" alignItems="baseline">
            <Typography weight="medium" variant="h6" className={classes.value}>{metric.value}</Typography>
            {metric.type &&
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
