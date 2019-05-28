import * as React from 'react';

import { useDaoApi } from 'services/daoApi';
import { Button } from 'shared/view/elements';
import { VotingDecision } from 'shared/types/models/Voting';
import { GetProps } from '_helpers';

interface IOwnProps {
  voteId: string;
  decisionType: VotingDecision;
  children: React.ReactNode;
}

type IProps = IOwnProps & GetProps<typeof Button>;

function VoteButton(props: IProps) {
  const { voteId, decisionType, children, ...buttonRest } = props;
  const daoApi = useDaoApi();

  const vote = React.useCallback(() => {
    daoApi.vote(voteId, decisionType);
  }, []);

  return (
    <Button onClick={vote} {...buttonRest}>
      {children}
    </Button>
  );
}

export default VoteButton;
