import * as React from 'react';
import { Typography, Grid, ProgressBar } from 'shared/view/elements';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './CooperativeGoal.style';

const tKeys = tKeysAll.features.cooperativeOverview;

interface IOwnProps {
  totalGoal: number;
  current: number;
  description: string;
}

type IProps = StylesProps & IOwnProps;

const CooperativeChart = (props: IProps) => {
  const {
    classes, description,
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
        <ProgressBar variant="secondary" totalValue={12000} currentValue={5280} className={classes.progress} />
      </Grid>
    </div>
  );
};

export default React.memo(provideStyles(CooperativeChart));
