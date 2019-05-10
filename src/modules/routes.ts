import build, { getParam } from 'shared/helpers/buildRouteTree';

const rawTree = {
  dao: {
    create: null,
    view: {
      id: getParam(null),
    },
  },
};

const routes = build(rawTree);

export default routes;
