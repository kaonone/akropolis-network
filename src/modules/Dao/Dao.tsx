import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import Home from './view/Home/Home';
import Create from './view/Create/Create';
import View from './view/View/View';

const HomeModule: IModule = {
  getRoutes() {
    return [(
      <Route
        exact
        key="Dao Home"
        path={routes.dao.getRoutePath()}
        component={Home}
      />
    ), (
      <Route
        exact
        key="Create Dao"
        path={routes.dao.create.getRoutePath()}
        component={Create}
      />
    ), (
      <Route
        exact
        key="View Dao"
        path={routes.dao.view.id.getRoutePath()}
        component={View}
      />
    )];
  },
};

export default HomeModule;
