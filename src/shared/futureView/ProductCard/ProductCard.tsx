import * as React from 'react';
import * as cn from 'classnames';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Grid, Typography, Button } from 'shared/view/elements';
import { formatPercent } from 'shared/helpers/format';
import { Settings, Info } from 'shared/view/elements/Icons';
import { CompoundStatus, ICompound, CompoundType } from 'shared/types/models/Compound';

import { StylesProps, provideStyles } from './ProductCard.style';

import AIcon from './icons/A.svg';
import BIcon from './icons/B.svg';
import CIcon from './icons/C.svg';
import DIcon from './icons/D.svg';
import EIcon from './icons/E.svg';

const compound = { balance: 0, earned: 0, status: 'waiting' as CompoundStatus, coin: 'APR', annualPercent: 0 };

// tslint:disable:max-line-length
const compoundA: ICompound = { ...compound, icon: AIcon, type: 'saving', status: 'need-enable', annualPercent: 7.47, description: 'Supply money to compound and earn interest' };
const compoundB: ICompound = { ...compound, icon: BIcon, type: 'investment', description: 'Invest in set-and-forget auto-rebalancing strategies' };
const compoundC: ICompound = { ...compound, icon: CIcon, type: 'credit', description: 'Lend money to Dharma Protocol and earn 14% APR' };
const compoundD: ICompound = { ...compound, icon: DIcon, type: 'saving', status: 'active', description: 'Buy S&500 index supported by UMA Protocol' };
const compoundE: ICompound = { ...compound, icon: EIcon, type: 'saving', coin: 'YTD', description: 'Delegate investment management to a professional' };

export const mockCompounds = [compoundA, compoundB, compoundC, compoundD, compoundE];

const tKeys = tKeysAll.features.compound;

const gridContainerProps = { container: true, wrap: 'nowrap', alignItems: 'center' } as any;

const translateKeyByType: Record<CompoundType, string> = {
  saving: tKeys.saving.getKey(),
  credit: tKeys.credit.getKey(),
  investment: tKeys.investment.getKey(),
};

interface IOwnProps {
  compound: ICompound;
  onWithdraw?(): void;
  onSupply?(): void;
  onEnable?(): void;
}

type IProps = StylesProps & IOwnProps;

export const CompoundCard = React.memo(provideStyles((props: IProps) => {
  const {
    classes, onEnable, onWithdraw, onSupply,
    compound: { type, description, icon, annualPercent, coin, balance, earned, status },
  } = props;
  const { t } = useTranslate();

  const metric = React.useCallback((title: string, value: number) => (
    <Grid item xs={6}>
      <Typography variant="overline" weight="medium" className={classes.metricTitle}>{title}</Typography>
      <Typography variant="h6" className={classes.metricValue}>{value}</Typography>
    </Grid>
  ), []);

  const footerByStatus: Record<CompoundStatus, () => React.ReactNode> = {
    ['waiting']: () => (
      <Grid {...gridContainerProps} justify="center" className={classes.waiting} >
        <Settings className={classes.waitingIcon} />
        <Typography variant="body2" weight="medium" className={classes.waitingLabel}>
          {t(tKeys.waiting.getKey())}
        </Typography>
      </Grid>),
    ['need-enable']: () => (
      <Grid {...gridContainerProps} spacing={8} className={classes.needEnable} >
        <Grid item>
          <Info className={classes.infoIcon} />
        </Grid>
        <Grid item xs={7}>
          <Typography variant="subtitle1" className={classes.enableLabel}>
            {t(tKeys.needEnableCompound.getKey())}
          </Typography>
        </Grid>
        <Grid item className={classes.enableButton}>
          <Button onClick={onEnable} color="primary" variant="contained">{t(tKeys.enable.getKey())}</Button>
        </Grid>
      </Grid>),
    ['active']: () => (
      <Grid {...gridContainerProps} justify="space-between" spacing={24} className={classes.actionsButton}>
        <Grid item xs={6}>
          <Button onClick={onWithdraw} color="primary" variant="contained" fullWidth>{t(tKeys.withdraw.getKey())}</Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={onSupply} color="primary" variant="contained" fullWidth>{t(tKeys.supply.getKey())}</Button>
        </Grid>
      </Grid>),
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.header} {...gridContainerProps}>
        <Typography
          variant="overline"
          weight="medium"
          component="div"
          className={classes.typeBadge}
        >
          {t(translateKeyByType[type])}
        </Typography>
        <Typography className={classes.title} variant="body2">{description}</Typography>
      </Grid>
      <div className={cn(classes.content, { [classes.isDisabled]: status === 'waiting' })}>
        <Grid {...gridContainerProps} className={classes.profit}>
          <img src={icon} className={classes.icon} />
          <Typography variant="h6" className={classes.annualProfit}>
            {formatPercent(annualPercent, 2)}{' '}
            {coin}
          </Typography>
        </Grid>

        <Grid {...gridContainerProps} className={classes.metrics}>
          {metric(t(tKeys.balance.getKey()), balance)}
          {metric(t(tKeys.balance.getKey()), earned)}
        </Grid>
        {footerByStatus[status]()}
      </div>
    </div>
  );
}));
