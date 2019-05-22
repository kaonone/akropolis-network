import * as React from 'react';
import * as moment from 'moment';

import { Typography } from 'shared/view/elements';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './PersonalInformation.style';
import AccessCard from './AccessCard/AccessCard';

const tKeys = tKeysAll.features.cooperativeOverview;

const tKeysShared = tKeysAll.shared;

const FIRST_SEPTEMBER = moment('2019-9-1');

const TOTAL_WAITING_DAYS_COUNT = 92;

const getDayLeft = () => {
  const diffWithSeptember = FIRST_SEPTEMBER.diff(moment(), 'days', true);

  if (diffWithSeptember < 0) {
    return 0;
  }

  if (diffWithSeptember > TOTAL_WAITING_DAYS_COUNT) {
    return TOTAL_WAITING_DAYS_COUNT;
  }

  return Math.ceil(diffWithSeptember);
};

type IProps = StylesProps;

const PersonalInformation = (props: IProps) => {
  const { classes } = props;
  const { t } = useTranslate();

  const dayLeft = getDayLeft();
  const dayPassed = TOTAL_WAITING_DAYS_COUNT - dayLeft;

  const timeLeft = t(dayLeft > 1 ? tKeysShared.days.getKey() : tKeysShared.day.getKey(), { amount: dayLeft });

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
          {'$192.22'}
        </Typography>
      </div>
      <div className={classes.metricRow}>

        <Typography component="div" variant="overline" className={classes.subTitle}>
          {t(tKeys.earn.getKey())}
        </Typography>
        <Typography component="div" variant="h6">
          {'$16.49'}
        </Typography>
      </div>
      <div className={classes.accessCards}>
        <AccessCard
          total={TOTAL_WAITING_DAYS_COUNT}
          current={dayPassed}
          description={t(tKeys.accessToLoan.getKey(), { date: '3 months' })}
          timeLeft={timeLeft}
          hint={t(tKeys.accessToLoanHint.getKey())}
        />
        <AccessCard
          total={TOTAL_WAITING_DAYS_COUNT}
          current={dayPassed}
          description={t(tKeys.accessToInsurance.getKey(), { date: '3 months' })}
          timeLeft={timeLeft}
          hint={t(tKeys.accessToInsuranceHint.getKey())}
        />
      </div>
    </div>
  );
};

export default React.memo(provideStyles(PersonalInformation));
