import * as React from 'react';
import { Link, LinkProps, RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';

import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { DaoNameCheckingAsync } from 'features/checkDaoNameUsed';
import { Grid, Typography, Button } from 'shared/view/elements';
import { withComponent } from 'shared/helpers/react';
import routes from 'modules/routes';

type IProps = InjectedAuthRouterProps;

const LinkButton = withComponent<React.ComponentClass<LinkProps>>(Link)(Button);

function Home(props: IProps & RouteComponentProps<any>) {
  const handleOpenDao = React.useCallback((daoName: string) => {
    props.history.push(routes.dao.view.id.getRedirectPath({ id: daoName }));
  }, []);

  return (
    <BaseLayout>
      <Grid container spacing={16}>
        <Grid item xs={6} container spacing={16} alignContent="flex-start">
          <Grid item xs={12}>
            <Typography variant="h4">Create a new co-op</Typography>
          </Grid>
          <Grid item xs={12}>
            <LinkButton variant="contained" color="primary" to={routes.dao.create.getRedirectPath()}>
              Create a new co-op
            </LinkButton>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="h4">Or open an existing co-op</Typography>
          </Grid>
          <Grid item xs={12}>
            <DaoNameCheckingAsync
              checkOf="used"
              actionButtonText="Open co-op"
              onActionClick={handleOpenDao}
              negativeCheckingDescription="No co-ops with that name exists."
            />
          </Grid>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}

export default Home;
