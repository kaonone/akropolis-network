import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { useDeps } from 'core';
import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';

import { CircleProgressBar, Typography } from 'shared/view/elements';
import { useCommunication } from 'shared/helpers/react';

function View(props: RouteComponentProps<{ id: string }>) {
  const { match } = props;
  const { daoApi } = useDeps();

  const daoApiInitializing = useCommunication(() => daoApi.setDao(match.params.id), [match.params.id]);

  React.useEffect(daoApiInitializing.execute, [match.params.id]);

  return (
    <BaseLayout backRoutePath={routes.daos.getRedirectPath()} title="Dao name">
      {daoApiInitializing.status === 'error' && (
        <Typography color="error">{daoApiInitializing.error}</Typography>
      )}
      {daoApiInitializing.status === 'pending' && (
        <CircleProgressBar size={40} />
      )}
      {daoApiInitializing.status === 'success' && (
        'Dao content'
      )}
    </BaseLayout>
  );
}

export default View;
