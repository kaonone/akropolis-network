import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';

import { CreateOrderButton, OrdersList } from 'features/trades';
import { Grid, Typography } from 'shared/view/elements';
import { AirSwapLogo } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './Account.style';

function Account(props: StylesProps & RouteComponentProps<any>) {
  const { classes } = props;
  return (
    <BaseLayout hideAccountLink backRoutePath={routes.daos.getRedirectPath()} title="Account" >
      <Grid container spacing={16} justify="space-between" alignItems="center">
        <Grid item>
          <Typography color="primary" variant="body1" weight="medium">
            Trades (powered by <AirSwapLogo className={classes.airSwapLogo} />)
          </Typography>
        </Grid>
        <Grid item>
          <CreateOrderButton />
        </Grid>
        <Grid item xs={12}>
          <OrdersList />
        </Grid>
      </Grid>
    </BaseLayout>
  );
}

export default provideStyles(Account);
