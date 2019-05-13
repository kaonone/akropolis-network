import * as React from 'react';
import { Link, LinkProps, RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';
import { DaoNameCheckingAsync } from 'features/checkDaoNameUsed';

import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { withComponent } from 'shared/helpers/react';
import { Grid, Typography, Button } from 'shared/view/elements';

type IProps = InjectedAuthRouterProps;

const LinkButton = withComponent<React.ComponentClass<LinkProps>>(Link)(Button);

function Daos(props: IProps & RouteComponentProps<any>) {
  const handleOpenDao = React.useCallback((daoName: string) => {
    props.history.push(routes.dao.view.id.getRedirectPath({ id: daoName }));
  }, []);

  const layoutActions = React.useMemo(() => [(
    <LinkButton key="1" variant="contained" color="primary" to={routes.dao.create.getRedirectPath()}>
      Create co-op
    </LinkButton>
  )], []);

  return (
    <BaseLayout title="My co-ops" actions={layoutActions}>
      <Grid container spacing={16}>
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
    </BaseLayout>
  );
}

export default Daos;
