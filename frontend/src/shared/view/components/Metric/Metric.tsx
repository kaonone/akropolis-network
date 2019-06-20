import * as React from 'react';

import { StylesProps, provideStyles } from './Metric.style';
import { Typography } from 'shared/view/elements';

interface IProps {
  title: string;
  value: string;
}

function Metric(props: IProps & StylesProps) {
  const { classes, title, value } = props;
  return (
    <div className={classes.root}>
      <Typography variant="overline" weight="medium" className={classes.metricTitle}>{title}</Typography>
      <Typography variant="h6" className={classes.metricValue}>{value}</Typography>
    </div>
  );
}

export default provideStyles(Metric);
