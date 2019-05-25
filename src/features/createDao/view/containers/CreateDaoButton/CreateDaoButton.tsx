import * as React from 'react';
import { connect } from 'react-redux';

import { tKeys, useTranslate } from 'services/i18n';

import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { useOnChangeState } from 'shared/helpers/react';
import { isSucceededByState } from 'shared/helpers/redux';
import { Button, CircleProgressBar } from 'shared/view/elements';
import { Cooperative } from 'shared/view/elements/Icons';
import { Modal, ErrorModal } from 'shared/view/components';

import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import { Progress } from '../../../namespace';
import CreateDaoForm from '../CreateDaoForm/CreateDaoForm';
import CreateDaoProgress from '../CreateDaoProgress/CreateDaoProgress';

const intl = tKeys.features.createDao;

interface IOwnProps {
  onCreate(domainName: string): void;
}

interface IStateProps {
  creating: ICommunication;
  progress: Progress;
  createdDao: string;
}

type IProps = IOwnProps & IStateProps & typeof mapDispatch;

function mapState(state: IAppReduxState): IStateProps {
  return {
    creating: selectors.selectCommunication(state, 'daoCreating'),
    progress: selectors.selectProgress(state),
    createdDao: selectors.selectCreatedDao(state),
  };
}

const mapDispatch = {
  setProgress: actions.setProgress,
};

function CreateDaoButton(props: IProps) {
  const { progress, creating, setProgress, onCreate, createdDao } = props;
  const [isOpened, setIsOpened] = React.useState(false);
  const { t } = useTranslate();

  useOnChangeState(creating, isSucceededByState, () => onCreate(createdDao));

  const handleIsOpenedChanging = React.useCallback((opened: boolean) => {
    setIsOpened(opened);
    if (!creating.isRequesting) {
      setProgress('initial');
    }
  }, []);

  const handleRetryClick = React.useCallback(() => {
    setProgress('initial');
  }, []);

  const showForm = progress === 'initial';

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleIsOpenedChanging.bind(null, true)}>
        {creating.isRequesting
          ? <CircleProgressBar size={16} />
          : <Cooperative />
        }
        {t(intl.createButton.getKey())}
      </Button>
      {!creating.error && (
        <Modal
          size="large"
          isOpen={isOpened}
          title={t(intl[showForm ? 'form' : 'progress'].title.getKey())}
          onClose={handleIsOpenedChanging.bind(null, false)}
        >
          {showForm ? <CreateDaoForm onCancel={handleIsOpenedChanging.bind(null, false)} /> : <CreateDaoProgress />}
        </Modal>
      )}
      {!!creating.error && (
        <ErrorModal
          isOpened={isOpened}
          onClose={handleIsOpenedChanging.bind(null, false)}
          onRetry={handleRetryClick}
        />
      )}
    </>
  );
}

export default connect(mapState, mapDispatch)(CreateDaoButton);
