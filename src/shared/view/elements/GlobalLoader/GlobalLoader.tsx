import * as React from 'react';

import { provideStyles, StylesProps } from './GlobalLoader.style';
import { Logo } from '../Icons';

interface IProps {
  description: string;
}

function GlobalLoader(props: IProps & StylesProps) {
  const { classes, description } = props;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Logo className={classes.logo} />
        <div className={classes.spinner} >
          <div className={classes.circle} />
          <div className={classes.circle} />
          <div className={classes.circle} />
        </div>
        <div className={classes.message}>{description}</div>
      </div>
    </div>
  );
}

export default provideStyles(GlobalLoader);
