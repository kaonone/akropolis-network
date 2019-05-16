import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import { Grid, IconButton, Typography } from 'shared/view/elements';
import { Back } from 'shared/view/elements/Icons';
import { withComponent } from 'shared/helpers/react';

import { provideStyles, StylesProps } from './Header.style';
import Profile from './Profile/Profile';

const LinkIconButton = withComponent(Link)(IconButton);

interface IOwnProps {
  actions?: React.ReactNode[];
  backRoutePath?: string;
  title: string;
  additionalContent: React.ReactNode;
}

type IProps = IOwnProps & StylesProps & RouteComponentProps;

class Header extends React.PureComponent<IProps> {
  public render() {
    const { classes, actions, title, backRoutePath, additionalContent } = this.props;
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
            <Profile />
          </Grid>
        </Grid>
        {additionalContent}
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
