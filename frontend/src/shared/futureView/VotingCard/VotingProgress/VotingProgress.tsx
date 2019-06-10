import * as React from 'react';
import { Grid, CircleProgressBar, Typography } from 'shared/view/elements';

import VotingProgressBar from './VotingProgressBar/VotingProgressBar';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Checked, ContainedCross } from 'shared/view/elements/Icons';
import { VoteButtonAsync } from 'features/vote';
import { VotingDecision } from 'shared/types/models/Voting';

import { StylesProps, provideStyles } from './../VotingCard.style';

const tKeysShared = tKeysAll.shared;

interface IOwnProps {
  voteId: string;
  votingDecision: VotingDecision;
  yeaPercent: number;
  nayPercent: number;
  showVoteButtons?: boolean;
}
type IProps = StylesProps & IOwnProps;

export default React.memo(provideStyles((props: IProps) => {

  const { classes, voteId, votingDecision, yeaPercent, nayPercent, showVoteButtons = true } = props;

  const [isRequesting, setIsRequesting] = React.useState(false);

  const { t } = useTranslate();
  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <VotingProgressBar title={t(tKeysShared.yes.getKey())} value={yeaPercent} type="for" />
      </Grid>
      <Grid item xs={12}>
        <VotingProgressBar title={t(tKeysShared.no.getKey())} value={nayPercent} type="against" />
      </Grid>
      {(() => {
        if (isRequesting) {
          return (
            <Grid item xs={12}>
              <Grid container wrap="nowrap" className={classes.votingDecision} justify="center">
                <CircleProgressBar size={16} />
              </Grid>
            </Grid>);
        }
        if (votingDecision !== 'absent') {
          return (
            <Grid item xs={12}>
              <Grid container wrap="nowrap" className={classes.votingDecision} justify="center">
                {votingDecision === 'confirm' && <Checked className={classes.votingForIcon} />}
                {votingDecision === 'reject' && <ContainedCross className={classes.votingAgainstIcon} />}
                <Typography weight="medium">
                  {votingDecision === 'confirm' ? t(tKeysShared.yes.getKey()) : t(tKeysShared.no.getKey())}
                </Typography>
              </Grid>
            </Grid>);
        }
        if (votingDecision === 'absent' && showVoteButtons) {
          return (
            <>
              <Grid item xs={6}>
                <VoteButtonAsync
                  fullWidth
                  color="primary"
                  variant="contained"
                  voteId={voteId}
                  decisionType="reject"
                  onChangeCommunication={setIsRequesting}
                >
                  {t(tKeysShared.no.getKey())}
                </VoteButtonAsync>
              </Grid>
              <Grid item xs={6}>
                <VoteButtonAsync
                  fullWidth
                  color="primary"
                  variant="contained"
                  voteId={voteId}
                  decisionType="confirm"
                  onChangeCommunication={setIsRequesting}
                >
                  {t(tKeysShared.yes.getKey())}
                </VoteButtonAsync>
              </Grid>
            </>);
        }
      })()}
    </Grid>
  );
}));
