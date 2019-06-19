import * as React from 'react';
import { Link } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import * as R from 'ramda';

import { BaseLayout, DaoMetrics } from 'modules/shared';
import routes from 'modules/routes';

import { tKeys as tkeysAll, useTranslate } from 'services/i18n';
import { useDaoApi } from 'services/daoApi';
import { useAccountAddress, useIsMember } from 'services/user';
import { JointToCooperativeButtonAsync } from 'features/jointToCooperative';
import { RequestWithdrawButtonAsync } from 'features/requestWithdraw';
import { RequestDepositButtonAsync } from 'features/requestDeposit';

import { IVoting } from 'shared/types/models';
import { ToggleButtonGroup, ToggleButton, Grid, Badge } from 'shared/view/elements';
import { withComponent } from 'shared/helpers/react';
import {
  useNewVotingEvents, sortByStatus, useFieldsForVotingStatus, useHasActiveJoinVoting,
} from 'shared/helpers/voting';

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

interface IOwnProps {
  daoId: string;
  selectedSection: string;
}

type IProps = IOwnProps & StylesProps;
function MainView(props: IProps) {
  const { classes, daoId, selectedSection } = props;
  const { t } = useTranslate();

  const daoApi = useDaoApi();

  const userAccountAddress = useAccountAddress();
  const tokenHolders = useObserver(() => daoApi.store.tokenManager.holders);
  const financeHolders = useObserver(() => daoApi.store.finance.holders);
  const daoOverview = useObserver(() => daoApi.store.coopBalanceOverview);
  const votes = useObserver(() => daoApi.store.voting.votings);
  const connectedAccountVotes = useObserver(() => daoApi.store.voting.connectedAccountVotes);
  const canVoteConnectedAccount = useObserver(() => daoApi.store.voting.canVoteConnectedAccount);

  const fieldsForVotingStatus = useFieldsForVotingStatus(daoApi);

  const sortVote = R.sortWith<IVoting>(
    [
      sortByStatus(fieldsForVotingStatus),
      R.descend(R.prop('startDate')),
    ],
  );

  const preparedVotes = React.useMemo(
    () => sortVote(Object.values(votes).filter(vote => vote.intent.type !== 'unknown')),
    [votes],
  );

  const newEvents = useNewVotingEvents(daoApi, preparedVotes);

  const links: ISectionLink[] = React.useMemo(() => ([
    { section: 'overview', title: tKeys.overview.getKey() },
    { section: 'activities', title: tKeys.activities.getKey(), badge: newEvents.length },
    { section: 'members', title: tKeys.members.getKey() },
    { section: 'products', title: tKeys.products.getKey() },
  ]), [newEvents]);

  const hasActiveJoinVoting: boolean = useHasActiveJoinVoting(daoApi, preparedVotes);

  const isMember = useIsMember(daoApi);
  const memoTokenHolders = React.useMemo(() => Object.values(tokenHolders), [tokenHolders]);

  return (
    <BaseLayout
      backRoutePath={routes.daos.getRedirectPath()}
      title={daoId}
      actions={(
        !isMember && !hasActiveJoinVoting && [<JointToCooperativeButtonAsync key="1" />] ||
        isMember && [<RequestWithdrawButtonAsync key="1" />, <RequestDepositButtonAsync key="2" />] ||
        undefined
      )}
      additionalHeaderContent={(
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
            <DaoMetrics
              balance={daoOverview.balance.value}
              deposit={daoOverview.deposit.value}
              withdraw={daoOverview.withdraw.value}
              deFi={daoOverview.deFi.value}
              balanceDayAgo={daoOverview.balance.valueDayAgo}
              depositDayAgo={daoOverview.deposit.valueDayAgo}
              withdrawDayAgo={daoOverview.withdraw.valueDayAgo}
              deFiDayAgo={daoOverview.deFi.valueDayAgo}
            />
          </Grid>
        </Grid>
      )}
    >
      <ToggleButtonGroup value={selectedSection} exclusive nullable={false} >
        {links.map(({ section, title, badge }, index: number) => (
          <NavToggleButton
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
        {selectedSection === 'activities' && (
          <Activities
            votes={preparedVotes}
            connectedAccountVotes={connectedAccountVotes}
            canVoteConnectedAccount={canVoteConnectedAccount}
          />
        )}
        {selectedSection === 'members' && (
          <Members
            tokenHolders={memoTokenHolders}
            financeHolders={financeHolders}
            userAccount={userAccountAddress}
          />
        )}
        {selectedSection === 'products' && <Products />}
        {selectedSection === 'history' && 'history'}
      </div>
    </BaseLayout >
  );
}

export default provideStyles(MainView);
