import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';
import { CreateDaoButtonAsync } from 'features/createDao';

import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import CooperativesList from 'shared/futureView/CooperativesList/CooperativesList';

type IProps = InjectedAuthRouterProps;

function Daos(props: IProps & RouteComponentProps<any>) {
  const handleOpenDao = React.useCallback((daoName: string) => {
    daoName && props.history.push(routes.dao.view.id.getRedirectPath({ id: daoName }));
  }, []);

  return (
    <BaseLayout title="My co-ops" actions={[<CreateDaoButtonAsync key="1" onCreate={handleOpenDao} />]}>
      <CooperativesList onSelectCooperative={handleOpenDao}/>
    </BaseLayout>
  );
}

export default Daos;
