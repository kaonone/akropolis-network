import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';

function Account(_props: RouteComponentProps<any>) {
  return (
    <BaseLayout hideAccountLink backRoutePath={routes.daos.getRedirectPath()} title="Account" >
      Coming soon
    </BaseLayout>
  );
}

export default Account;
