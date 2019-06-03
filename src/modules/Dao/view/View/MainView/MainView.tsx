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
import { useNewVotingEvents, calculateIsRejected } from 'shared/helpers/voting';
import { addressesEqual } from 'shared/helpers/web3';

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
  const daoOverview = useObserver(() => daoApi.store.finance.daoOverview);
  const votingConfig = useObserver(() => daoApi.store.voting.config);
  const votes = useObserver(() => daoApi.store.voting.votings);
  const connectedAccountVotes = useObserver(() => daoApi.store.voting.connectedAccountVotes);
  const canVoteConnectedAccount = useObserver(() => daoApi.store.voting.canVoteConnectedAccount);

  const preparedVotes = React.useMemo(
    () => Object.values(votes)
      .filter(vote => vote.intent.type !== 'unknown')
      .sort((a, b) => b.startDate - a.startDate),
    [votes],
  );

  const newEvents = useNewVotingEvents(daoApi, preparedVotes);

  const links: ISectionLink[] = React.useMemo(() => ([
    { section: 'overview', title: tKeys.overview.getKey() },
    { section: 'activities', title: tKeys.activities.getKey(), badge: newEvents.length },
    { section: 'members', title: tKeys.members.getKey() },
    { section: 'products', title: tKeys.products.getKey() },
  ]), [newEvents]);

  const hasActiveJoinVoting: boolean = React.useMemo(() => {
    return !!preparedVotes
      .filter(
        vote => (
          vote.intent.type === 'joinToDao' &&
          addressesEqual(vote.intent.payload.address, userAccountAddress) &&
          !calculateIsRejected(vote, votingConfig.voteTime) &&
          !vote.executed
        ),
      ).length;
  }, [preparedVotes, userAccountAddress, votingConfig]);

  const userAccount = tokenHolders[userAccountAddress];
  const memoTokenHolders = React.useMemo(() => Object.values(tokenHolders), [tokenHolders]);

  return (
    <BaseLayout
      backRoutePath={routes.daos.getRedirectPath()}
      title={daoId}
      actions={userAccount || hasActiveJoinVoting ? undefined : [<JointToCooperativeButtonAsync key={1} />]}
      additionalHeaderContent={(
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
            <DaoMetrics
              balance={daoOverview.balance.value}
              deposit={daoOverview.deposit.value}
              withdraw={daoOverview.withdraw.value}
              balanceChange={daoOverview.balance.change}
              depositChange={daoOverview.deposit.change}
              withdrawChange={daoOverview.withdraw.change}
            />
          </Grid>
          {!!userAccount && (
            <>
              <Grid item>
                <RequestWithdrawButtonAsync />
              </Grid>
              <Grid item>
                <RequestDepositButtonAsync />
              </Grid>
            </>
          )}
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
            votings={preparedVotes}
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
