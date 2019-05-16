import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { useDeps } from 'core';

import { BaseLayout, DaoMetrics } from 'modules/shared';
import routes from 'modules/routes';
import { tKeys as tkeysAll, useTranslate } from 'services/i18n';

import { CircleProgressBar, Typography, ToggleButtonGroup, ToggleButton, Button } from 'shared/view/elements';
import { Request, Deposit } from 'shared/view/elements/Icons';
import { useCommunication, withComponent } from 'shared/helpers/react';

import { StylesProps, provideStyles } from './View.style';

const tKeys = tkeysAll.modules.daos;

const NavToggleButton = withComponent(Link)(ToggleButton);

interface IHeaderButton {
  label: string;
  Icon: React.ComponentType<any>;
}

type Section = 'overview' | 'activities' | 'members' | 'compound' | 'history';

interface ISectionLink {
  section: Section;
  title: string;
  disabled?: boolean;
}

const links: ISectionLink[] = [
  { section: 'overview', title: tKeys.overview.getKey() },
  { section: 'activities', title: tKeys.activities.getKey(), disabled: true },
  { section: 'members', title: tKeys.members.getKey(), disabled: true },
  { section: 'compound', title: tKeys.compound.getKey(), disabled: true },
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
      <Button
        color="secondary"
        variant="contained"
        className={classes.headerButton}
      >
        <Icon className={classes.headerButtonIcon} />
        <Typography className={classes.headerButtonTitle} variant="body1">{label}</Typography>
      </Button>));

  return (
    <BaseLayout
      backRoutePath={routes.daos.getRedirectPath()}
      title="Dao name"
      additionalHeaderContent={
        <DaoMetrics
          balance={2192.22}
          debit={1200.92}
          increase={12.81}
          decrease={12.81}
          credit={0.5}
          actions={daoActionButtons}
        />}
    >
      <ToggleButtonGroup value={selectedSection} exclusive nullable={false} >
        {links.map(({ section, title }, index: number) => (
          <NavToggleButton
            className={classes.sectionLink}
            key={index}
            to={routes.dao.view.id.section.getRedirectPath({ id: daoId, section })}
            value={section}
          >
            {<>
              {t(title)}
              {section === 'activities' &&
                <Typography variant="caption" weight="bold" className={classes.activitiesCount}>94</Typography>}
            </>}
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
        <div>
          {selectedSection === 'overview' && 'overview'}
          {selectedSection === 'activities' && 'activities'}
          {selectedSection === 'members' && 'members'}
          {selectedSection === 'compound' && 'compound'}
          {selectedSection === 'history' && 'history'}
        </div>
      }
    </BaseLayout >
  );
}

export default withRouter(provideStyles(View));
