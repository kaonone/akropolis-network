import * as React from 'react';

import { StylesProps, provideStyles } from './Products.style';
import { Grid } from 'shared/view/elements';
import { mockCompounds, CompoundCard } from 'shared/futureView/ProductCard/ProductCard';

type IProps = StylesProps;

function Products(props: IProps) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={32} alignItems="stretch">
        {mockCompounds.map((compound, i) => (
          <Grid key={i} item xs={6}><CompoundCard compound={compound} /></Grid>
        ))}
      </Grid>
    </div>);
}

export default provideStyles(Products);
