import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';

import { CreateOrderButton } from 'features/trades';
import { Grid, Typography } from 'shared/view/elements';

function Account(_props: RouteComponentProps<any>) {
  return (
    <BaseLayout hideAccountLink backRoutePath={routes.daos.getRedirectPath()} title="Account" >
      <Grid container spacing={16} justify="space-between" alignItems="center">
        <Grid item>
          <Typography color="primary" variant="h6">Trades (powered by AirSwap)</Typography>
        </Grid>
        <Grid item>
          <CreateOrderButton />
        </Grid>
        <Grid item xs={12}>
          Coming soon
        </Grid>
      </Grid>
    </BaseLayout>
  );
}

export default Account;
