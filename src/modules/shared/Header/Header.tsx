import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import { selectors } from 'services/user';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { SignInButton } from 'features/signIn';
import { IAppReduxState } from 'shared/types/app';
import { Grid, IconButton, Typography } from 'shared/view/elements';
import { Back } from 'shared/view/elements/Icons';
import { withComponent } from 'shared/helpers/react';

import { provideStyles, StylesProps } from './Header.style';
import Profile from './Profile/Profile';
import ExpandedContent from './ExpandedContent/ExpandedContent';

const tKeys = tKeysAll.features.signIn;

const LinkIconButton = withComponent(Link)(IconButton);

interface IOwnProps {
  actions?: React.ReactNode[];
  backRoutePath?: string;
  title: string;
}

interface IStateProps {
  isLogged: boolean;
}

type IProps = IOwnProps & IStateProps & StylesProps & RouteComponentProps & ITranslateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    isLogged: selectors.selectIsLogged(state),
  };
}

class Header extends React.PureComponent<IProps> {
  public render() {
    const { classes, t, isLogged, actions, title, backRoutePath } = this.props;
    return (
      <div className={classes.root}>
        <Grid container wrap="nowrap" alignItems="center" spacing={16}>
          {backRoutePath && (
            <Grid item>
              <LinkIconButton to={backRoutePath} className={classes.backButton}><Back /></LinkIconButton>
            </Grid>
          )}
          <Grid item xs zeroMinWidth>
            <Typography variant="h5" noWrap weight="bold" className={classes.title}>{title}</Typography>
          </Grid>
          {actions && !!actions.length && (
            actions.map((action, index) => (
              <Grid item key={index}>{action}</Grid>
            ))
          )}
          <Grid item>
            {isLogged && <Profile />}
            {!isLogged &&
              <ExpandedContent title={t(tKeys.connectToWallet.getKey())}>
                <Grid container spacing={8} direction="column">
                  <Grid item>
                    <Typography>{t(tKeys.metamaskDescription.getKey())}</Typography>
                  </Grid>
                  <SignInButton fullWidth size="small">
                    {t(tKeys.button.getKey(), { address: 'Metamask' })}
                  </SignInButton>
                </Grid>
              </ExpandedContent>
            }
          </Grid>
        </Grid>
      </div>
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
