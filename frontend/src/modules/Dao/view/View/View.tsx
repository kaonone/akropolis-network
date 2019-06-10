import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { DaoApi, DaoApiContext } from 'services/daoApi';
import { useCommunication } from 'shared/helpers/react';

import PreparingView from './PreparingView/PreparingView';
import MainView from './MainView/MainView';

type IProps = RouteComponentProps<{ id: string, section: string }>;

function View(props: IProps) {
  const { match: { params: { id: daoId, section: selectedSection } } } = props;

  const daoApiCreating = useCommunication(() => DaoApi.getDaoApiOrCreate(daoId), [daoId]);
  React.useEffect(daoApiCreating.execute, [daoId]);

  if (daoApiCreating.status !== 'success' || !daoApiCreating.result) {
    return (
      <PreparingView
        daoId={daoId}
        error={daoApiCreating.error}
        onRetry={daoApiCreating.execute}
      />
    );
  }

  return (
    <DaoApiContext.Provider value={daoApiCreating.result}>
      <MainView
        daoId={daoId}
        selectedSection={selectedSection}
      />
    </DaoApiContext.Provider>
  );
}

export default withRouter(View);
