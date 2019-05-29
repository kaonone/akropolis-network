import * as React from 'react';
import { Link } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';

import { BaseLayout, DaoMetrics } from 'modules/shared';
import routes from 'modules/routes';

import { tKeys as tkeysAll, useTranslate } from 'services/i18n';
import { useDaoApi } from 'services/daoApi';
import { useAccountAddress } from 'services/user';
import { JointToCooperativeButtonAsync } from 'features/jointToCooperative';
import { RequestWithdrawButtonAsync } from 'features/requestWithdraw';
import { RequestDepositButtonAsync } from 'features/requestDeposit';

import { ToggleButtonGroup, ToggleButton, Grid, Badge } from 'shared/view/elements';
import { withComponent } from 'shared/helpers/react';

import { Section } from '../../../types';
import { Activities, Products, Members, Cooperative } from './mockViews';
import { StylesProps, provideStyles } from './MainView.style';

const tKeys = tkeysAll.modules.daos;

const NavToggleButton = withComponent(Link)(ToggleButton);
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
  daoId: string;
  selectedSection: string;
}

type IProps = IOwnProps & StylesProps;
function MainView(props: IProps) {
  const { classes, daoId, selectedSection } = props;
  const { t } = useTranslate();

  const daoApi = useDaoApi();

  const userAccount = useAccountAddress();
  const tokenHolders = useObserver(() => daoApi.store.tokenManager.holders);
  const financeHolders = useObserver(() => daoApi.store.finance.holders);
  const daoOverview = useObserver(() => daoApi.store.finance.daoOverview);

  const isInCoopUser = tokenHolders.find(item => item.address === userAccount);

  return (
    <BaseLayout
      backRoutePath={routes.daos.getRedirectPath()}
      title={daoId}
      actions={isInCoopUser ? undefined : [<JointToCooperativeButtonAsync key={1} />]}
      additionalHeaderContent={
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
            <DaoMetrics
              balance={daoOverview.balance}
              debit={daoOverview.debit}
              credit={daoOverview.credit}
              balanceChange={12.81}
              debitChange={-12.81}
            />
          </Grid>
          <Grid item>
            <RequestWithdrawButtonAsync />
          </Grid>
          <Grid item>
            <RequestDepositButtonAsync />
          </Grid>
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
        {selectedSection === 'overview' && <Cooperative />}
        {selectedSection === 'activities' && <Activities />}
        {selectedSection === 'members' && (
          <Members tokenHolders={tokenHolders} financeHolders={financeHolders} userAccount={userAccount} />
        )}
        {selectedSection === 'products' && <Products />}
        {selectedSection === 'history' && 'history'}
      </div>
    </BaseLayout >
  );
}

export default provideStyles(MainView);
