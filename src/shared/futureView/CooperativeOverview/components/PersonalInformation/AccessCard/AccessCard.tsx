import * as React from 'react';
import { Typography, Grid, ProgressBar, Tooltip } from 'shared/view/elements';
import { Info } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './AccessCard.style';

interface IOwnProps {
  total: number;
  current: number;
  description: string;
  timeLeft: string;
  hint: string;
}

type IProps = StylesProps & IOwnProps;

const AccessCard = (props: IProps) => {
  const {
    classes, total, current, description, timeLeft: timePassed, hint,
  } = props;

  return (
    <Grid container wrap="nowrap" alignContent="center" className={classes.root}>
      <Grid item>
        <ProgressBar variant="primary" className={classes.progress} totalValue={total} currentValue={current} />
      </Grid>
      <Grid item>
        <Typography component="div" variant="overline" weight="medium" className={classes.title}>
          {description}
        </Typography>
        <Typography component="div" variant="body1" weight="medium" className={classes.subTitle}>
          {timePassed}
        </Typography>
      </Grid>
      <Tooltip title={hint} placement="top">
        <Info className={classes.hintIcon} />
      </Tooltip>
    </Grid>
  );
};

export default React.memo(provideStyles(AccessCard));
