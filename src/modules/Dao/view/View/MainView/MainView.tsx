import * as React from 'react';
import { Link } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';

import { BaseLayout, DaoMetrics } from 'modules/shared';
import routes from 'modules/routes';

import { tKeys as tkeysAll, useTranslate } from 'services/i18n';
import { DaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';

import { ToggleButtonGroup, ToggleButton, Button, Grid, Badge } from 'shared/view/elements';
import { Request, Deposit } from 'shared/view/elements/Icons';
import { withComponent } from 'shared/helpers/react';

import { Activities, Products, Members } from './mockViews';
import { StylesProps, provideStyles } from './MainView.style';

const tKeys = tkeysAll.modules.daos;

const NavToggleButton = withComponent(Link)(ToggleButton);

interface IHeaderButton {
  label: string;
  Icon: React.ComponentType<any>;
}

export type Section = 'overview' | 'activities' | 'members' | 'products' | 'history';

interface ISectionLink {
  section: Section;
  title: string;
  disabled?: boolean;
  badge?: number;
}

const links: ISectionLink[] = [
  { section: 'overview', title: tKeys.overview.getKey() },
  { section: 'activities', title: tKeys.activities.getKey(), disabled: true, badge: 94 },
  { section: 'members', title: tKeys.members.getKey(), disabled: true },
  { section: 'products', title: tKeys.products.getKey(), disabled: true },
  { section: 'history', title: tKeys.history.getKey(), disabled: true },
];

interface IOwnProps {
  daoApi: DaoApi;
  daoId: string;
  selectedSection: string;
}

type IProps = IOwnProps & StylesProps;
function MainView(props: IProps) {
  const { classes, daoApi, daoId, selectedSection } = props;
  const { t } = useTranslate();

  const userAccount = useAccountAddress();
  const tokenHolders = useObserver(() => daoApi.store.tokenManager.holders);

  const actions: IHeaderButton[] = [
    { label: t(tKeys.request.getKey()), Icon: Request },
    { label: t(tKeys.deposit.getKey()), Icon: Deposit },
  ];

  const daoActionButtons = actions.map(
    ({ label, Icon }) => (
      <Grid item key={label}>
        <Button color="secondary" variant="contained">
          <Icon className={classes.headerButtonIcon} />
          {label}
        </Button>
      </Grid>
    ),
  );

  return (
    <BaseLayout
      backRoutePath={routes.daos.getRedirectPath()}
      title={daoId}
      additionalHeaderContent={
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
            <DaoMetrics
              balance={2192.22}
              debit={1200.92}
              balanceChange={12.81}
              debitChange={-12.81}
              credit={0.5}
            />
          </Grid>
          {daoActionButtons}
        </Grid>}
    >
      <ToggleButtonGroup value={selectedSection} exclusive nullable={false} >
        {links.map(({ section, title, badge }, index: number) => (
          <NavToggleButton
            className={classes.sectionLink}
            key={index}
            to={routes.dao.view.id.section.getRedirectPath({ id: daoId, section })}
            value={section}
          >
            <Badge color="primary" className={classes.withBadge} badgeContent={badge || 0}>
              {t(title)}
            </Badge>
          </NavToggleButton>
        ))}
      </ToggleButtonGroup>
      <div className={classes.section}>
        {selectedSection === 'overview' && 'overview'}
        {selectedSection === 'activities' && <Activities />}
        {selectedSection === 'members' && <Members tokenHolders={tokenHolders} userAccount={userAccount} />}
        {selectedSection === 'products' && <Products />}
        {selectedSection === 'history' && 'history'}
      </div>
    </BaseLayout >
  );
}

export default provideStyles(MainView);
