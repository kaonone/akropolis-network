import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';
import { CreateDaoButtonAsync } from 'features/createDao';

import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import CooperativesList, { cooperativesMock } from 'shared/futureView/CooperativesList/CooperativesList';
import VotingCard, { mockVote } from 'shared/futureView/VotingCard/VotingCard';

type IProps = InjectedAuthRouterProps;

function Daos(props: IProps & RouteComponentProps<any>) {
  const handleOpenDao = React.useCallback((daoName: string) => {
    props.history.push(routes.dao.view.id.getRedirectPath({ id: daoName }));
  }, []);

  return (
    <BaseLayout title="My co-ops" actions={[<CreateDaoButtonAsync key="1" onCreate={handleOpenDao} />]}>
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
