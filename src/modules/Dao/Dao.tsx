import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import Daos from './view/Daos/Daos';
import Create from './view/Create/Create';
import View from './view/View/View';

const HomeModule: IModule = {
  getRoutes() {
    return [(
      <Route
        exact
        key="Daos"
        path={routes.daos.getRoutePath()}
        component={Daos}
      />
    ), (
      <Route
        exact
        key="Create Dao"
        path={routes.dao.create.getRoutePath()}
        component={Create}
      />
    ), (
      <Route key="View Dao" path={routes.dao.view.id.getRoutePath()}>
        {({ match }) => (
          <Switch>
            <Route path={routes.dao.view.id.section.getRoutePath()} component={View} />
            <Redirect to={routes.dao.view.id.section.getRedirectPath({ id: match.params.id, section: 'overview' })} />
          </Switch>
        )}
      </Route>
    )];
  },
};

export default HomeModule;
