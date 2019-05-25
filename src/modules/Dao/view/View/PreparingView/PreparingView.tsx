import * as React from 'react';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';
import { useTranslate, tKeys } from 'services/i18n';

import { GlobalLoader } from 'shared/view/elements';
import { RetryModal } from 'shared/view/components';

interface IProps {
  daoId: string;
  error?: string;
  onRetry(): void;
}

function PreparingView(props: IProps) {
  const { daoId, error, onRetry } = props;
  const { t } = useTranslate();

  return (
    <BaseLayout
      backRoutePath={routes.daos.getRedirectPath()}
      title={daoId}
    >
      {!!error && (
        <RetryModal
          title={t(tKeys.shared.somethingWentWrong.getKey())}
          buttonText={t(tKeys.shared.retry.getKey())}
          onRetry={onRetry}
        />
      )}
      <GlobalLoader description={'Co-op loading...'} />
    </BaseLayout >
  );
}

export default PreparingView;
