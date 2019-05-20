import * as React from 'react';

import { StylesProps, provideStyles } from './Compound.style';

function Compound(props: StylesProps) {
  const { classes } = props;
  return (
    <div className={classes.root} />
  );
}

export default provideStyles(Compound);
