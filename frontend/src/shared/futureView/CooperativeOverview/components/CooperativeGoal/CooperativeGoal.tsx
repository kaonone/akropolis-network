import * as React from 'react';
import { Typography, Grid, ProgressBar } from 'shared/view/elements';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './CooperativeGoal.style';

const tKeys = tKeysAll.features.cooperativeOverview;

interface IOwnProps {
  totalGoal: number;
  currentBalance: number;
  description: string;
}

type IProps = StylesProps & IOwnProps;

function CooperativeChart(props: IProps) {
  const {
    classes, description, totalGoal, currentBalance,
  } = props;
  const { t } = useTranslate();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" weight="medium" className={classes.title}>
        {t(tKeys.cooperativeGoal.getKey())}
      </Typography>
      <Typography variant="subtitle1" weight="medium" className={classes.description}>
        {description}
      </Typography>
      <Grid container justify="center">
        <ProgressBar
          variant="secondary"
          totalValue={totalGoal}
          currentValue={Math.min(currentBalance, totalGoal)}
          progressPrecision={2}
          className={classes.progress}
        />
      </Grid>
    </div>
  );
}

export default React.memo(provideStyles(CooperativeChart));
