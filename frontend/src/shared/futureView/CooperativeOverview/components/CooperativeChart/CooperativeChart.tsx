import * as React from 'react';
import BigNumber from 'bignumber.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { Typography, Grid, Avatar, Growth } from 'shared/view/elements';
import { formatDAI } from 'shared/helpers/format';
import getIdenticonSrc from 'shared/helpers/getIdenticonSrc';

import { StylesProps, provideStyles } from './CooperativeChart.style';

import chartMock from './chartMock.svg';

const tKeys = tKeysAll.features.cooperativeOverview;

interface IOwnProps {
  members: string[];
  balance: BigNumber;
  balanceDayAgo: BigNumber;
}

type IProps = StylesProps & IOwnProps;

const CooperativeChart = (props: IProps) => {
  const { classes, members, balance, balanceDayAgo } = props;
  const { t } = useTranslate();

  return (
    <div className={classes.root}>
      <Grid container wrap="nowrap" justify="space-between" className={classes.header}>
        <Grid item>
          <Typography weight="medium" variant="subtitle1" className={classes.headerTitle}>
            {t(tKeys.cooperativeBalance.getKey())}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container wrap="nowrap" direction="row-reverse">
            <Avatar classes={{ colorDefault: classes.membersCount }}>
              <Typography weight="medium" variant="subtitle1">{members.length}</Typography>
            </Avatar>
            {members.slice(0, 3).map(item => (
              <Avatar key={item} src={getIdenticonSrc(item)} className={classes.avatarStub} />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container wrap="nowrap" alignItems="flex-start" className={classes.balance}>
        <Typography className={classes.balanceValue} variant="h5">{formatDAI(balance)}</Typography>
        <Growth previous={balanceDayAgo} current={balance} />
      </Grid>
      <img className={classes.graphic} src={chartMock} />
    </div>
  );
};

export default React.memo(provideStyles(CooperativeChart));
