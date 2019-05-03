import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import routes from 'modules/routes';

import { selectors } from 'services/user';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { SignInButton } from 'features/signIn';
import { IAppReduxState } from 'shared/types/app';

import Logo from '../Logo/Logo';
import Menu from './Menu/Menu';
import { provideStyles, StylesProps } from './Header.style';
import Profile from './Profile/Profile';
import ExpandedContent from './ExpandedContent/ExpandedContent';

const brandRedirectPath = routes.marketplace.getRoutePath();

const tKeys = tKeysAll.features.signIn;
interface IStateProps {
  isLogged: boolean;
}

type IProps = IStateProps & StylesProps & RouteComponentProps & ITranslateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    isLogged: selectors.selectIsLogged(state),
  };
}

class Header extends React.PureComponent<IProps> {
  public render() {
    const { classes, t, isLogged } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.logo}>
            <Logo viewType="row" linkTo={brandRedirectPath} />
          </div>
          <div className={classes.desktopMenu}>
            <Menu isLogged={isLogged} />
          </div>
          <div className={classes.accountStatus}>
            {isLogged && <Profile />}
            {!isLogged &&
              <ExpandedContent title={t(tKeys.connectToWallet.getKey())}>
                <>
                  <div className={classes.signInDescription}>
                    {t(tKeys.metamaskDescription.getKey())}
                  </div>
                  <SignInButton fullWidth size="small" className={classes.signButton}>
                    {t(tKeys.button.getKey(), { address: 'Metamask' })}
                  </SignInButton>
                </>
              </ExpandedContent>
            }
          </div>
        </div>
      </div >
    );
  }
}

export { IProps };
export default (
  withRouter(
    connect(mapState)(
      i18nConnect(provideStyles(Header)),
    ),
  )
);
