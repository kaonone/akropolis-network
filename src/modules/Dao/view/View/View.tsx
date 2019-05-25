import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { useDeps } from 'core';

import { BaseLayout, DaoMetrics } from 'modules/shared';
import routes from 'modules/routes';
import { tKeys as tkeysAll, useTranslate } from 'services/i18n';

import {
  CircleProgressBar, Typography, ToggleButtonGroup, ToggleButton, Button, Grid, Badge,
} from 'shared/view/elements';
import { Request, Deposit } from 'shared/view/elements/Icons';
import { useCommunication, withComponent } from 'shared/helpers/react';

import { Activities, Products, Members, Cooperative } from './mockViews';
import { StylesProps, provideStyles } from './View.style';

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

type IProps = RouteComponentProps<{ id: string, section: string }> & StylesProps;
function View(props: IProps) {
  const { classes, match: { params: { id: daoId, section: selectedSection } } } = props;
  const { daoApi } = useDeps();

  const { t } = useTranslate();
  const daoApiInitializing = useCommunication(() => daoApi.setDao(daoId), [daoId]);

  React.useEffect(daoApiInitializing.execute, [daoId]);

  const actions: IHeaderButton[] = [
    { label: t(tKeys.request.getKey()), Icon: Request },
    { label: t(tKeys.deposit.getKey()), Icon: Deposit },
  ];

  const daoActionButtons = daoApiInitializing.status !== 'success' ? undefined :
    actions.map(({ label, Icon }) => (
      <Grid item key={label}>
        <Button color="secondary" variant="contained">
          <Icon className={classes.headerButtonIcon} />
          {label}
        </Button>
      </Grid>));

  return (
    <BaseLayout
      backRoutePath={routes.daos.getRedirectPath()}
      title="Dao name"
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
      {
        daoApiInitializing.status === 'error' && (
          <Typography color="error">{daoApiInitializing.error}</Typography>
        )
      }
      {
        daoApiInitializing.status === 'pending' && (
          <CircleProgressBar size={40} />
        )
      }
      {
        daoApiInitializing.status === 'success' &&
        <div className={classes.section}>
          {selectedSection === 'overview' && <Cooperative />}
          {selectedSection === 'activities' && <Activities />}
          {selectedSection === 'members' && <Members />}
          {selectedSection === 'products' && <Products />}
          {selectedSection === 'history' && 'history'}
        </div>
      }
    </BaseLayout >
  );
}

export default withRouter(provideStyles(View));
