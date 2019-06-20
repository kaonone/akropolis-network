import * as React from 'react';
import BigNumber from 'bignumber.js';

import { TOTAL_WAITING_DAYS_FOR_ACCESS } from 'core/constants';
import { Typography } from 'shared/view/elements';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useDaysForAccess } from 'shared/helpers/user';
import { formatDAI } from 'shared/helpers/format';
import { useDaoApi } from 'services/daoApi';

import AccessCard from './AccessCard/AccessCard';

import { StylesProps, provideStyles } from './PersonalInformation.style';

const tKeys = tKeysAll.features.cooperativeOverview;

const tKeysShared = tKeysAll.shared;

interface IOwnProps {
  balance: BigNumber;
  earn: number;
}

type IProps = IOwnProps & StylesProps;

const PersonalInformation = (props: IProps) => {
  const { classes, balance, earn } = props;
  const { t } = useTranslate();
  const daoApi = useDaoApi();

  const days = useDaysForAccess(daoApi);
  const timePassed = days ? days.dayPassed : 0;
  const timeLeft = days ? t(tKeysShared.daysAmount.getKey(), days.dayLeft) : t(tKeys.forMembers.getKey());

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" weight="medium" className={classes.title}>
        {t(tKeys.personalInformation.getKey())}
      </Typography>
      <div className={classes.metricRow}>
        <Typography component="div" variant="overline" className={classes.subTitle}>
          {t(tKeys.balance.getKey())}
        </Typography>
        <Typography component="div" variant="h6">
          {formatDAI(balance)}
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
          total={TOTAL_WAITING_DAYS_FOR_ACCESS}
          current={timePassed}
          description={t(tKeys.accessToLoan.getKey())}
          timeLeft={timeLeft}
          hint={t(tKeys.accessToLoanHint.getKey())}
        />
        <AccessCard
          total={TOTAL_WAITING_DAYS_FOR_ACCESS}
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
