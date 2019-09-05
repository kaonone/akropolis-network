import * as React from 'react';
import BigNumber from 'bignumber.js';

import { tKeys as tkeysAll, useTranslate } from 'services/i18n';
import { formatDAI } from 'shared/helpers/format';
import { Grid, Typography, Growth } from 'shared/view/elements';

import { provideStyles, StylesProps } from './DaoMetrics.style';

const tKeys = tkeysAll.modules.daos;

interface IMetric {
  title: string;
  formatedValue: string;
  value: BigNumber;
  valueDayAgo: BigNumber;
}

interface IOwnProps {
  balance: BigNumber;
  balanceDayAgo: BigNumber;
  deposit: BigNumber;
  depositDayAgo: BigNumber;
  withdraw: BigNumber;
  withdrawDayAgo: BigNumber;
  deFi: BigNumber;
  deFiDayAgo: BigNumber;
}
type IProps = IOwnProps & StylesProps;

const DaoMetrics = (props: IProps) => {
  const { classes, balance, balanceDayAgo, deposit, depositDayAgo, withdraw, withdrawDayAgo, deFi, deFiDayAgo } = props;

  const { t } = useTranslate();
  const metrics: IMetric[] = [
    {
      title: t(tKeys.balance.getKey()),
      formatedValue: formatDAI(balance, 2),
      value: balance,
      valueDayAgo: balanceDayAgo,
    },
    {
      title: t(tKeys.deposit.getKey()),
      formatedValue: formatDAI(deposit, 2),
      value: deposit,
      valueDayAgo: depositDayAgo,
    },
    {
      title: t(tKeys.withdraw.getKey()),
      formatedValue: formatDAI(withdraw, 2),
      value: withdraw,
      valueDayAgo: withdrawDayAgo,
    },
    {
      title: t(tKeys.deFi.getKey()),
      formatedValue: formatDAI(deFi, 2),
      value: deFi,
      valueDayAgo: deFiDayAgo,
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
