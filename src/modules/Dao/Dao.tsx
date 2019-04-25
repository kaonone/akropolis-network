import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import Home from './view/Home/Home';

const HomeModule: IModule = {
  getRoutes() {
    return (
      <Route
        exact
        key="Home"
        path={routes.dao.getRoutePath()}
        component={Home}
      />
    );
  },
};

export default HomeModule;
