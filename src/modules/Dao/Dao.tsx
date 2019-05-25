import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import { Section } from './types';
import Daos from './view/Daos/Daos';
import View from './view/View/View';

const defaultSection: Section = 'overview';

const HomeModule: IModule = {
  getRoutes() {
    return [
      <Route exact key="Daos" path={routes.daos.getRoutePath()} component={Daos} />,
      // tslint:disable-next-line:jsx-wrap-multiline
      <Redirect
        exact
        key="View Dao Redirect"
        from={routes.dao.view.id.getRoutePath()}
        to={routes.dao.view.id.getRoutePath() + '/' + defaultSection}
      />,
      <Route exact key="View Dao" path={routes.dao.view.id.section.getRoutePath()} component={View} />,
    ];
  },
};

export default HomeModule;
