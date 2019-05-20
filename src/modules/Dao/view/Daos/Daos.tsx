import * as React from 'react';
import { Link, LinkProps, RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';
import { DaoNameCheckingAsync } from 'features/checkDaoNameUsed';

import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { withComponent } from 'shared/helpers/react';
import { Grid, Typography, Button } from 'shared/view/elements';
import CooperativesList, { cooperativesMock } from 'shared/futureView/CooperativesList/CooperativesList';
import VotingCard, { mockVote } from 'shared/futureView/VotingCard/VotingCard';

type IProps = InjectedAuthRouterProps;

const LinkButton = withComponent<React.ComponentClass<LinkProps>>(Link)(Button);

function Daos(props: IProps & RouteComponentProps<any>) {
  const handleOpenDao = React.useCallback((daoName: string) => {
    props.history.push(routes.dao.view.id.getRedirectPath({ id: daoName }));
  }, []);

  const layoutActions = React.useMemo(() => [(
    <LinkButton key="1" variant="contained" color="primary" to={routes.dao.create.getRedirectPath()}>
      Create co-op
    </LinkButton>
  )], []);

  return (
    <BaseLayout title="My co-ops" actions={layoutActions}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h4">Or open an existing co-op</Typography>
        </Grid>
        <Grid item xs={12}>
          <DaoNameCheckingAsync
            checkOf="used"
            actionButtonText="Open co-op"
            onActionClick={handleOpenDao}
            negativeCheckingDescription="No co-ops with that name exists."
          />
        </Grid>
      </Grid>
      <CooperativesList cooperatives={cooperativesMock} />
      <div>
        <div style={{ marginBottom: '0.5rem' }}><VotingCard {...mockVote} /></div>
        <div style={{ marginBottom: '0.5rem' }}><VotingCard {...mockVote} votingDecision="for" /></div>
        <div style={{ marginBottom: '0.5rem' }}><VotingCard {...mockVote} votingDecision="against" /></div>
        <div style={{ marginBottom: '0.5rem' }}>
          <VotingCard<'join'> {...mockVote} type="join" votingParams={{ address: '0x1a5basdasdasdasdasd77a2' }} />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <VotingCard {...mockVote} votingDecision="against" type="deposit" />
        </div>
        <div style={{ marginBottom: '0.5rem' }}><VotingCard {...mockVote} votingResult="approved" /></div>
        <div style={{ marginBottom: '0.5rem' }}><VotingCard {...mockVote} votingResult="declined" /></div>
      </div>
    </BaseLayout>
  );
}

export default Daos;
