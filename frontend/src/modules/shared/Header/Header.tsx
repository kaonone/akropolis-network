import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import * as cn from 'classnames';

import routes from 'modules/routes';
import { Grid, IconButton, Typography } from 'shared/view/elements';
import { Back, AccountBoxOutlined } from 'shared/view/elements/Icons';
import { withComponent } from 'shared/helpers/react';

import { provideStyles, StylesProps } from './Header.style';
import Profile from './Profile/Profile';

const LinkIconButton = withComponent(Link)(IconButton);

interface IOwnProps {
  actions?: React.ReactNode[];
  backRoutePath?: string;
  title: string;
  additionalContent?: React.ReactNode;
  hideAccountLink?: boolean;
}

type IProps = IOwnProps & StylesProps & RouteComponentProps;

class Header extends React.PureComponent<IProps> {
  public render() {
    const { classes, actions, title, additionalContent, backRoutePath, hideAccountLink } = this.props;
    return (
      <div className={classes.root}>
        <Grid container alignItems="center" spacing={16}>
          {backRoutePath && (
            <Grid item>
              <LinkIconButton to={backRoutePath} className={classes.iconButton}><Back /></LinkIconButton>
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
            <Profile />
          </Grid>
          {!hideAccountLink && (
            <Grid item>
              <LinkIconButton
                to={routes.account.getRedirectPath()}
                className={cn(classes.iconButton, classes.accountIcon)}
              >
                <AccountBoxOutlined fontSize="large" />
              </LinkIconButton>
            </Grid>
          )}
          {!!additionalContent && <Grid item xs={12}>{additionalContent}</Grid>}
        </Grid>
      </div>
    );
  }
}

export { IProps };
export default (
  withRouter(
    provideStyles(Header),
  )
);
