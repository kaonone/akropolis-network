import * as React from 'react';
import { InjectDrizzleProps } from 'drizzle-react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { NETWORK_CONFIG } from 'core/constants';

import { actions as userActions, selectors as userSelectors, useAccountAddress } from 'services/user';
import { tKeys, useTranslate } from 'services/i18n';
import { actions as signInActions, selectors as signInSelectors } from 'features/signIn';

import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { withDrizzle, useOnChangeState } from 'shared/helpers/react';
import { isFailedByState } from 'shared/helpers/redux';
import { GlobalLoader } from 'shared/view/elements';
import { RetryModal } from 'shared/view/components';
import { becomeTrue, becomeFalse } from 'shared/helpers/changing';

type IAuthStatus = 'ready' | 'loading' | 'unsupported-network' | 'not-found-metamask' | 'login-needed';

interface IOwnProps {
  children: React.ReactNode;
}

interface IStateProps {
  isCheckedAuth: boolean;
  isLogged: boolean;
  signing: ICommunication;
}

type ActionProps = typeof mapDispatch;

type IProps = IOwnProps & ActionProps & IStateProps & InjectDrizzleProps & RouteComponentProps;

const LoadingContainer = (props: IProps) => {
  const { signIn, drizzleState, initialized, checkIsUserSigned, isCheckedAuth, isLogged, signing } = props;
  const { t } = useTranslate();

  const [authStatus, setAuthStatus] = React.useState<IAuthStatus>('loading');

  const accountAddress = useAccountAddress();

  const reloadPage = React.useCallback(() => {
    location.reload();
  }, []);

  const handleSignIn = React.useCallback(() => {
    signIn({ address: accountAddress });
  }, [accountAddress]);

  useOnChangeState(initialized, becomeTrue, () => {
    const isFoundMetamask = drizzleState.web3.status !== 'failed';
    const isEmptyAccounts =
      drizzleState.web3.status === 'initialized' && Object.keys(drizzleState.accounts).length === 0;
    const isUnsupportedNetwork =
      drizzleState.web3.status === 'initialized' && drizzleState.web3.networkId !== NETWORK_CONFIG.id;

    if (!isFoundMetamask) {
      setAuthStatus('not-found-metamask');
    } else if (isEmptyAccounts || isUnsupportedNetwork) {
      setAuthStatus('unsupported-network');
    } else {
      checkIsUserSigned();
    }
  });

  useOnChangeState(isCheckedAuth, becomeTrue, () => {
    if (isLogged) {
      setAuthStatus('ready');
    } else {
      handleSignIn();
    }
  });

  useOnChangeState(isLogged, becomeTrue, () => {
    setAuthStatus('ready');
  });

  useOnChangeState(isLogged, becomeFalse, () => {
    setAuthStatus('login-needed');
  });

  useOnChangeState(signing, isFailedByState, () => {
    setAuthStatus('login-needed');
  });

  const byStatus: Record<IAuthStatus, () => React.ReactElement> = {
    'not-found-metamask': () => (
      <RetryModal
        title={t(tKeys.shared.noEthereumConnection.getKey())}
        buttonText={t(tKeys.shared.retry.getKey())}
        onRetry={reloadPage}
      >
        {t(tKeys.shared.needUseMetamask.getKey())}
      </RetryModal>
    ),
    'unsupported-network': () => (
      <RetryModal
        title={t(tKeys.shared.noEthereumConnection.getKey())}
        buttonText={t(tKeys.shared.retry.getKey())}
        onRetry={reloadPage}
      >
        {t(tKeys.shared.noEthereumAccounts.getKey())}
      </RetryModal>
    ),
    'login-needed': () => (
      <RetryModal
        title={t(tKeys.features.signIn.connectToWallet.getKey())}
        buttonText={t(tKeys.features.signIn.button.getKey(), { address: accountAddress })}
        onRetry={handleSignIn}
      >
        {t(tKeys.features.signIn.metamaskDescription.getKey())}
      </RetryModal>
    ),
    loading: () => <GlobalLoader description={t(tKeys.shared.makeSureUseKovan.getKey())} />,
    ready: () => <>{props.children}</>,
  };

  return byStatus[authStatus]();
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isCheckedAuth: userSelectors.selectIsCheckedAuth(state),
    isLogged: userSelectors.selectIsLogged(state),
    signing: signInSelectors.selectCommunication(state, 'signing'),
  };
}

const mapDispatch = {
  checkIsUserSigned: userActions.checkIsUserSigned,
  signIn: signInActions.signIn,
};

export default withDrizzle(
  withRouter(
    connect(mapState, mapDispatch)(LoadingContainer),
  ),
);
