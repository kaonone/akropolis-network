import * as React from 'react';

import { formatDAI } from 'shared/helpers/format';
import { tKeys as tkeysAll, useTranslate } from 'services/i18n';

import { Grid, Typography, Growth } from 'shared/view/elements';

import { provideStyles, StylesProps } from './DaoMetrics.style';

const tKeys = tkeysAll.modules.daos;

interface IMetric {
  title: string;
  formatedValue: string;
  value: number;
  valueDayAgo: number;
}

interface IOwnProps {
  balance: number;
  balanceDayAgo: number;
  deposit: number;
  depositDayAgo: number;
  withdraw: number;
  withdrawDayAgo: number;
}
type IProps = IOwnProps & StylesProps;

const DaoMetrics = (props: IProps) => {
  const { classes, balance, balanceDayAgo, deposit, depositDayAgo, withdraw, withdrawDayAgo } = props;

  const { t } = useTranslate();
  const metrics: IMetric[] = [
    {
      title: t(tKeys.balance.getKey()),
      formatedValue: formatDAI(balance),
      value: balance,
      valueDayAgo: balanceDayAgo,
    },
    {
      title: t(tKeys.deposit.getKey()),
      formatedValue: formatDAI(deposit),
      value: deposit,
      valueDayAgo: depositDayAgo,
    },
    {
      title: t(tKeys.withdraw.getKey()),
      formatedValue: formatDAI(withdraw),
      value: withdraw,
      valueDayAgo: withdrawDayAgo,
    },
  ];
  return (
    <Grid container wrap="nowrap" alignItems="center" className={classes.root}>
      {metrics.map((metric, i) => (
        <Grid key={i} item className={classes.metric}>
          <Typography variant="overline" className={classes.title}>{metric.title}</Typography>
          <Grid container wrap="nowrap" alignItems="baseline">
            <Typography weight="medium" variant="h6" className={classes.value}>{metric.formatedValue}</Typography>
            <Growth previous={metric.valueDayAgo} current={metric.value} />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export { IProps };
export default provideStyles(DaoMetrics);
