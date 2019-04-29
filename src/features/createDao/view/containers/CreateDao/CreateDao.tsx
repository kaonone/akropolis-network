import * as React from 'react';
import { connect } from 'react-redux';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { DaoNameCheckingAsync } from 'features/checkDaoNameUsed';

import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { Typography, Grid } from 'shared/view/elements';
import { useOnChangeState } from 'shared/helpers/react';
import { isSucceededByState } from 'shared/helpers/redux';

import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import { StylesProps, provideStyles } from './CreateDao.style';

interface IOwnProps {
  onCreate(daoName: string): void;
}

interface IStateProps {
  creating: ICommunication;
}

type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps & IOwnProps & StylesProps & ITranslateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    creating: selectors.selectCommunication(state, 'daoCreating'),
  };
}

const mapDispatch = {
  createDao: actions.createDao,
};

function CreateDao(props: IProps & StylesProps) {
  const { createDao, creating, onCreate } = props;
  const createdNameRef = React.useRef('');

  const handleCreate = React.useCallback((domainName: string) => {
    createDao({ domainName });
    createdNameRef.current = domainName;
  }, []);

  useOnChangeState(
    creating,
    isSucceededByState,
    () => onCreate(createdNameRef.current),
  );

  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <DaoNameCheckingAsync
          disabled={creating.isRequesting}
          actionIsInProgress={creating.isRequesting}
          checkOf="unused"
          actionButtonText="Create co-op"
          onActionClick={handleCreate}
          negativeCheckingDescription="Co-op with that name already exists."
        />
      </Grid>
      {creating.error && (
        <Grid item xs={12}><Typography variant="body1" color="error">{creating.error}</Typography></Grid>
      )}
    </Grid>
  );
}

export { CreateDao };
export default (
  connect(mapState, mapDispatch)(
    i18nConnect(provideStyles(CreateDao)),
  )
);
