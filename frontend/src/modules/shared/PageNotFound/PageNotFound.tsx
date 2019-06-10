import * as React from 'react';

import routes from 'modules/routes';
import { i18nConnect, ITranslateProps, tKeys } from 'services/i18n';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

import BaseLayout from '../BaseLayout/BaseLayout';
import { provideStyles, StylesProps } from './PageNotFound.style';

type IProps = StylesProps & ITranslateProps & InjectedAuthRouterProps;

class PageNotFound extends React.PureComponent<IProps> {
  public render() {
    const { classes, t } = this.props;
    return (
      <BaseLayout title={t(tKeys.shared.pageNotFound.getKey())} backRoutePath={routes.daos.getRedirectPath()}>
        <div className={classes.root}>
          <div className={classes.title}>404.</div>
          <div className={classes.description}>{t(tKeys.shared.pageNotFound.getKey())}</div>
        </div>
      </BaseLayout>
    );
  }
}

export { IProps };
export default i18nConnect(provideStyles(PageNotFound));
