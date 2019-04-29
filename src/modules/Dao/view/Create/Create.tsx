import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import routes from 'modules/routes';
import { BaseLayout } from 'modules/shared';
import { CreateDaoAsync } from 'features/createDao';

import { Grid, Typography } from 'shared/view/elements';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

type IProps = InjectedAuthRouterProps;

function Create(props: IProps & RouteComponentProps<any>) {
  const handleCreateDao = React.useCallback((daoName: string) => {
    props.history.push(routes.dao.id.getRedirectPath({ id: `${daoName}.aragonid.eth` }));
  }, []);

  return (
    <BaseLayout>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h4">Create a new co-op</Typography>
        </Grid>
        <Grid item xs={12}>
          <CreateDaoAsync onCreate={handleCreateDao} />
        </Grid>
      </Grid>
    </BaseLayout>
  );
}

export default Create;
