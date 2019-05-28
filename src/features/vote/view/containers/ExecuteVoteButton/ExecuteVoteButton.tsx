import * as React from 'react';
import { GetProps } from '_helpers';

import { ErrorModal } from 'shared/view/components';
import { useDaoApi } from 'services/daoApi';
import { Button } from 'shared/view/elements';

interface IOwnProps {
  voteId: string;
  onChangeCommunication: (isRequesting: boolean) => void;
  children: React.ReactNode;
}

type IProps = IOwnProps & GetProps<typeof Button>;

function ExecuteVoteButton(props: IProps) {
  const { voteId, children, onChangeCommunication, ...buttonRest } = props;
  const [hasError, setHasError] = React.useState(false);

  const daoApi = useDaoApi();

  const executeVote = React.useCallback(async () => {
    try {
      onChangeCommunication(true);
      await daoApi.executeVote(voteId);
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
      <Button onClick={executeVote} {...buttonRest}>
        {children}
      </Button>
      <ErrorModal
        isOpened={hasError}
        onClose={handleErrorChanging.bind(null, false)}
        onRetry={handleErrorChanging.bind(null, false)}
      />
    </>);
}

export default ExecuteVoteButton;
