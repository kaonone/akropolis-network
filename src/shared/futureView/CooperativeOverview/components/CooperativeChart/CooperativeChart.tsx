import * as React from 'react';

import { Typography, Grid, Avatar } from 'shared/view/elements';
import { formatPercent, formatUSD } from 'shared/helpers/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import getIdenticonSrc from 'shared/helpers/getIdenticonSrc';

import { Increase, Decrease } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './CooperativeChart.style';

import chartMock from './chartMock.svg';

const IDENTICON_SRC = getIdenticonSrc('afa00d2k31erFD43t7C13aa1-023e-ap60qva7632B');

const tKeys = tKeysAll.features.cooperativeOverview;

interface IOwnProps {
  membersCount: number;
  balance: number;
  balanceChange: number;
}

type IProps = StylesProps & IOwnProps;

const CooperativeChart = (props: IProps) => {
  const {
    classes, membersCount, balance, balanceChange,
  } = props;
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
              <Typography weight="medium" variant="subtitle1">{membersCount}</Typography>
            </Avatar>
            <Avatar src={IDENTICON_SRC} className={classes.avatarStub} />
            <Avatar src={IDENTICON_SRC} className={classes.avatarStub} />
            <Avatar src={IDENTICON_SRC} className={classes.avatarStub} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container wrap="nowrap" alignItems="flex-start" className={classes.balance}>
        <Typography className={classes.balanceValue} variant="h5">{formatUSD(balance)}</Typography>
        <Typography variant="body2" weight="medium" className={classes.balanceChange}>
          {balanceChange >= 0 && <Increase className={classes.arrowIcon} />}
          {balanceChange < 0 && <Decrease className={classes.arrowIcon} />}
          {formatPercent(balanceChange)}
        </Typography>
      </Grid>
      <img className={classes.graphic} src={chartMock} />
    </div>
  );
};

export default React.memo(provideStyles(CooperativeChart));
