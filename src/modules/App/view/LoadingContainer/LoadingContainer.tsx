import * as React from 'react';
import { bind } from 'decko';
import { InjectDrizzleProps } from 'drizzle-react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { NETWORK_CONFIG } from 'core/constants';

import { actions as userActions, selectors as userSelectors } from 'services/user';
import { i18nConnect, ITranslateProps, tKeys } from 'services/i18n';
import { actions as signInActions, selectors as signInSelectors } from 'features/signIn';

import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { withDrizzle } from 'shared/helpers/react';
import { isFailedByState } from 'shared/helpers/redux';
import { GlobalLoader } from 'shared/view/elements';

import RetryModal from '../RetryModal/RetryModal';

interface IState {
  status: 'ready' | 'loading' | 'unsupported-network' | 'not-found-metamask' | 'login-needed';
}

interface IOwnProps {
  children: React.ReactNode;
}

interface IStateProps {
  isCheckedAuth: boolean;
  isLogged: boolean;
  signing: ICommunication;
}

type ActionProps = typeof mapDispatch;

type IProps = IOwnProps & ActionProps & IStateProps & InjectDrizzleProps & RouteComponentProps & ITranslateProps;

class LoadingContainer extends React.Component<IProps, IState> {
  public state: IState = { status: 'loading' };
  public componentDidUpdate(prevProps: IProps) {
    const { initialized, drizzleState, checkIsUserSigned, isCheckedAuth, isLogged, signing } = this.props;

    if (!prevProps.initialized && initialized) {
      const isFoundMetamask = drizzleState.web3.status !== 'failed';
      const isEmptyAccounts =
        drizzleState.web3.status === 'initialized' && Object.keys(drizzleState.accounts).length === 0;
      const isUnsupportedNetwork =
        drizzleState.web3.status === 'initialized' && drizzleState.web3.networkId !== NETWORK_CONFIG.id;

      if (!isFoundMetamask) {
        this.setState({ status: 'not-found-metamask' });
      } else if (isEmptyAccounts || isUnsupportedNetwork) {
        this.setState({ status: 'unsupported-network' });
      } else {
        checkIsUserSigned();
      }
    }

    if (!prevProps.isCheckedAuth && isCheckedAuth) {
      if (isLogged) {
        this.setState({ status: 'ready' });
      } else {
        this.signIn();
      }
    }

    if (prevProps.isLogged && !isLogged || isFailedByState(prevProps.signing, signing)) {
      this.setState({ status: 'login-needed' });
    }

    if (!prevProps.isLogged && isLogged) {
      this.setState({ status: 'ready' });
    }
  }
  public render() {
    const { t, drizzleState } = this.props;
    const { status } = this.state;

    const byStatus: Record<IState['status'], () => React.ReactNode> = {
      'not-found-metamask': () => (
        <RetryModal
          title={t(tKeys.shared.noEthereumConnection.getKey())}
          buttonText={t(tKeys.shared.retry.getKey())}
          onRetry={this.reloadPage}
        >
          {t(tKeys.shared.needUseMetamask.getKey())}
        </RetryModal>
      ),
      'unsupported-network': () => (
        <RetryModal
          title={t(tKeys.shared.noEthereumConnection.getKey())}
          buttonText={t(tKeys.shared.retry.getKey())}
          onRetry={this.reloadPage}
        >
          {t(tKeys.shared.noEthereumAccounts.getKey())}
        </RetryModal>
      ),
      'login-needed': () => (
        <RetryModal
          title={t(tKeys.features.signIn.connectToWallet.getKey())}
          buttonText={t(tKeys.features.signIn.button.getKey(), { address: drizzleState.accounts[0] })}
          onRetry={this.signIn}
        >
          {t(tKeys.features.signIn.metamaskDescription.getKey())}
        </RetryModal>
      ),
      loading: () => <GlobalLoader />,
      ready: () => this.props.children,
    };

    return byStatus[status]();
  }

  private reloadPage() {
    location.reload();
  }

  @bind
  private signIn() {
    const { signIn, drizzleState } = this.props;
    signIn({ address: drizzleState.accounts[0] });
  }
}

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
    i18nConnect(
      connect(mapState, mapDispatch)(LoadingContainer),
    ),
  ),
);
