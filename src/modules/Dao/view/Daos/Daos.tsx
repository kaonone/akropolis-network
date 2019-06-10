import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';
import { useTranslate, tKeys } from 'services/i18n';
import { useDaoIds } from 'services/loadDaoNames';
import { CreateDaoButtonAsync } from 'features/createDao';

import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import CooperativesList from 'shared/futureView/CooperativesList/CooperativesList';
import { RetryModal } from 'shared/view/components';
import { GlobalLoader } from 'shared/view/elements';

type IProps = InjectedAuthRouterProps;

function Daos(props: IProps & RouteComponentProps<any>) {
  const handleOpenDao = React.useCallback((daoName: string) => {
    daoName && props.history.push(routes.dao.view.id.getRedirectPath({ id: daoName }));
  }, []);

  const { t } = useTranslate();
  const { daoIds, loading, retry } = useDaoIds();

  return (
    <BaseLayout title="Co-ops" actions={[<CreateDaoButtonAsync key="1" onCreate={handleOpenDao} />]}>
      {loading.status === 'error' && loading.error && (
        <RetryModal
          title={t(tKeys.shared.somethingWentWrong.getKey())}
          buttonText={t(tKeys.shared.retry.getKey())}
          onRetry={retry}
        />
      )}
      {loading.status === 'pending' && (
        <GlobalLoader description={'Co-ops loading...'} />
      )}
      {loading.status === 'ready' && (
        <CooperativesList onSelectCooperative={handleOpenDao} daoIds={daoIds} />
      )}
    </BaseLayout>
  );
}

export default Daos;
