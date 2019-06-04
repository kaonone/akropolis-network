import * as React from 'react';
import * as moment from 'moment';
import * as R from 'ramda';

import { Typography } from 'shared/view/elements';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { formatDAI } from 'shared/helpers/format';
import { useDaoApi } from 'services/daoApi';
import getLastConfirmedJoinTransaction from 'shared/helpers/getLastConfirmedJoinTransaction';

import AccessCard from './AccessCard/AccessCard';

import { StylesProps, provideStyles } from './PersonalInformation.style';

const tKeys = tKeysAll.features.cooperativeOverview;

const tKeysShared = tKeysAll.shared;

const TOTAL_WAITING_DAYS_COUNT = 90;

const getDays = (startDate: number) => {
  const dayPassed = R.clamp(0, TOTAL_WAITING_DAYS_COUNT, Math.ceil(moment().diff(moment(startDate), 'days', true)));
  const dayLeft = TOTAL_WAITING_DAYS_COUNT - dayPassed;
  return { dayLeft, dayPassed };
};

interface IOwnProps {
  deposit: number;
  earn: number;
}

type IProps = IOwnProps & StylesProps;

const PersonalInformation = (props: IProps) => {
  const { classes, deposit, earn } = props;
  const { t } = useTranslate();
  const daoApi = useDaoApi();
  const lastJoinTransaction = getLastConfirmedJoinTransaction(daoApi);
  const days = lastJoinTransaction && getDays(lastJoinTransaction.startDate);

  const timePassed = days ? days.dayPassed : 0;
  const timeLeft = days ? t(tKeysShared.daysAmount.getKey(), days.dayLeft) : t(tKeys.forMembers.getKey());

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" weight="medium" className={classes.title}>
        {t(tKeys.personalInformation.getKey())}
      </Typography>
      <div className={classes.metricRow}>
        <Typography component="div" variant="overline" className={classes.subTitle}>
          {t(tKeys.deposit.getKey())}
        </Typography>
        <Typography component="div" variant="h6">
          {formatDAI(deposit)}
        </Typography>
      </div>
      <div className={classes.metricRow}>
        <Typography component="div" variant="overline" className={classes.subTitle}>
          {t(tKeys.earn.getKey())}
        </Typography>
        <Typography component="div" variant="h6">
          {formatDAI(earn)}
        </Typography>
      </div>
      <div className={classes.accessCards}>
        <AccessCard
          total={TOTAL_WAITING_DAYS_COUNT}
          current={timePassed}
          description={t(tKeys.accessToLoan.getKey())}
          timeLeft={timeLeft}
          hint={t(tKeys.accessToLoanHint.getKey())}
        />
        <AccessCard
          total={TOTAL_WAITING_DAYS_COUNT}
          current={timePassed}
          description={t(tKeys.accessToInsurance.getKey())}
          timeLeft={timeLeft}
          hint={t(tKeys.accessToInsuranceHint.getKey())}
        />
      </div>
    </div>
  );
};

export default React.memo(provideStyles(PersonalInformation));
