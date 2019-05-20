import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import * as icons from '../Icons';

function IconsDemo() {
  return (
    <Grid container spacing={16}>
      {Object.values(icons).map((Icon, index) => (
        <Grid item xs={4} style={{ fontSize: 24 }} key={index}>
          <Grid container spacing={16}>
            <Grid item xs zeroMinWidth>{(Icon as any).displayName || Icon.name}</Grid>
            <Grid item><Icon /></Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default IconsDemo;
