import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import Account from './view/Account/Account';

const AccountModule: IModule = {
  getRoutes() {
    return [
      <Route exact key="Account" path={routes.account.getRoutePath()} component={Account} />,
    ];
  },
};

export default AccountModule;
