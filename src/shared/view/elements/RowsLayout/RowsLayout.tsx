import * as React from 'react';
import { GetProps } from '_helpers';
import { provideStyles, StylesProps } from './RowsLayout.style';
import Grid from '@material-ui/core/Grid/Grid';

interface IProps {
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  spacing?: GetProps<typeof Grid>['spacing'];
}

function RowsLayout({ children, footerContent, headerContent, classes, spacing }: IProps & StylesProps) {
  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={spacing} className={classes.container}>
        {!!headerContent && <Grid item>{headerContent}</Grid>}
        {!!children && <Grid item xs>{children}</Grid>}
        {!!footerContent && <Grid item>{footerContent}</Grid>}
      </Grid>
    </div>
  );
}

export { IProps };
export default provideStyles(RowsLayout);
