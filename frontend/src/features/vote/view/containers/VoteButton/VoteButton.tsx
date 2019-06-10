import * as React from 'react';
import { GetProps } from '_helpers';

import { ErrorModal } from 'shared/view/components';
import { useDaoApi } from 'services/daoApi';
import { Button } from 'shared/view/elements';
import { VotingDecision } from 'shared/types/models/Voting';

interface IOwnProps {
  voteId: string;
  decisionType: VotingDecision;
  onChangeCommunication: (isRequesting: boolean) => void;
  children: React.ReactNode;
}

type IProps = IOwnProps & GetProps<typeof Button>;

function VoteButton(props: IProps) {
  const { voteId, decisionType, children, onChangeCommunication, ...buttonRest } = props;
  const [hasError, setHasError] = React.useState(false);

  const daoApi = useDaoApi();

  const vote = React.useCallback(async () => {
    try {
      onChangeCommunication(true);
      await daoApi.vote(voteId, decisionType);
      onChangeCommunication(false);
    } catch (e) {
      onChangeCommunication(false);
      setHasError(true);
    }
  }, []);

  const handleErrorChanging = React.useCallback((withError: boolean) => {
    setHasError(withError);
  }, []);

  return (
    <>
      <Button onClick={vote} {...buttonRest}>
        {children}
      </Button>
      <ErrorModal
        isOpened={hasError}
        onClose={handleErrorChanging.bind(null, false)}
        onRetry={handleErrorChanging.bind(null, false)}
      />
    </>);
}

export default VoteButton;
