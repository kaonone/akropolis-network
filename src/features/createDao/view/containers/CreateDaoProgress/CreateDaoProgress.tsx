import * as React from 'react';
import { connect } from 'react-redux';

import { useTranslate, tKeys } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { Typography, Grid } from 'shared/view/elements';

import * as selectors from './../../../redux/selectors';
import { Progress } from '../../../namespace';
import StageStatus from './StageStatus/StageStatus';
import { StylesProps, provideStyles } from './CreateDaoProgress.style';

interface IStateProps {
  progress: Progress;
}

type IProps = IStateProps & StylesProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    progress: selectors.selectProgress(state),
  };
}

const progressTKeys = tKeys.features.createDao.progress;

const stages: Progress[] = ['initial', 'token-creating', 'dao-creating', 'dao-created'];

function CreateDaoProgress(props: IProps) {
  const { classes, progress } = props;
  const { t } = useTranslate();

  const currentStage = stages.findIndex((stage) => stage === progress);
  const isDoneToken = currentStage >= 2;
  const isDoneDao = currentStage === stages.length;
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Typography variant="body1" align="center">{t(progressTKeys.description.getKey())}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid className={classes.stages} container justify="space-between">
          <Grid item><StageStatus title={t(progressTKeys.tokenTitle.getKey())} isDone={isDoneToken} /></Grid>
          <Grid item><StageStatus title={t(progressTKeys.coopTitle.getKey())} isDone={isDoneDao} /></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default connect(mapState)(provideStyles(CreateDaoProgress));
