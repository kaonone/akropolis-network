import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import routes from 'modules/routes';
import { BaseLayout } from 'modules/shared';
import { CreateDaoAsync } from 'features/createDao';

import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

type IProps = InjectedAuthRouterProps;

function Create(props: IProps & RouteComponentProps<any>) {
  const handleCreateDao = React.useCallback((daoName: string) => {
    props.history.push(routes.dao.view.id.getRedirectPath({ id: daoName }));
  }, []);

  return (
    <BaseLayout title="Create a new co-op" backRoutePath={routes.daos.getRedirectPath()}>
      <CreateDaoAsync onCreate={handleCreateDao} />
    </BaseLayout>
  );
}

export default Create;
