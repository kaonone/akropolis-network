import * as React from 'react';

import { Typography } from 'shared/view/elements';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './PersonalInformation.style';
import AccessCard from './AccessCard/AccessCard';

const tKeys = tKeysAll.features.cooperativeOverview;

type IProps = StylesProps;

const PersonalInformation = (props: IProps) => {
  const { classes } = props;
  const { t } = useTranslate();

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
          total={100}
          current={78}
          description={t(tKeys.accessToLoan.getKey(), { date: '3 months' })}
          timePassed="24 days"
          hint={t(tKeys.accessToLoanHint.getKey())}
        />
        <AccessCard
          total={100}
          current={44}
          description={t(tKeys.accessToInsurance.getKey(), { date: '3 months' })}
          timePassed="24 days"
          hint={t(tKeys.accessToInsuranceHint.getKey())}
        />
      </div>
    </div>
  );
};

export default React.memo(provideStyles(PersonalInformation));
