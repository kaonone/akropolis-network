import * as React from 'react';
import * as cn from 'classnames';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

import { StylesProps, provideStyles } from './CircleProgressBar.style';
import { Omit } from '_helpers';

type IProps = Omit<CircularProgressProps, 'classes'> & StylesProps;

function CircleProgressBar(props: IProps) {
  const { classes, className, ...rest } = props;
  return (
    <div className={cn(props.classes.root, className)}>
      <CircularProgress
        className={props.classes.overlay}
        variant="determinate"
        size={props.size}
        value={100}
      />
      <CircularProgress
        className={props.classes.progress}
        {...rest}
      />
    </div>
  );
}

export default provideStyles(CircleProgressBar);
