import * as React from 'react';
import * as cn from 'classnames';

import { StylesProps, provideStyles } from './VotingProgress.style';

import { Typography, Grid } from 'shared/view/elements';
import { formatPercent } from 'shared/helpers/format';

interface IPropgressProps {
  title: string;
  value: number;
  type: 'for' | 'against';
}

export default React.memo(provideStyles((props: IPropgressProps & StylesProps) => {

  const { classes, title, value, type } = props;

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" wrap="nowrap">
        <Typography component="span" variant="subtitle1">{title}</Typography>
        <Typography component="span" variant="subtitle1" weight="medium">{formatPercent(value)}</Typography>
      </Grid>
      <div className={classes.progressBar}>
        <div
          className={cn(classes.progressBarValue,
            {
              [classes.green]: type === 'for',
              [classes.red]: type === 'against',
            })}
          style={{ width: `${value.toFixed(2)}%` }}
        />
      </div>
    </div>
  );
}));
