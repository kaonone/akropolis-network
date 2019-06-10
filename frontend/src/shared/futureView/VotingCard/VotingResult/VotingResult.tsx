import * as React from 'react';
import { Grid, Typography } from 'shared/view/elements';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Checked, ContainedCross } from 'shared/view/elements/Icons';
import { ExecuteVoteButtonAsync } from 'features/vote';
import { VotingStatus } from 'shared/types/models/Voting';
import { formatPercent } from 'shared/helpers/format';

import { StylesProps, provideStyles } from './../VotingCard.style';

const tKeys = tKeysAll.features.voting;
const tKeysShared = tKeysAll.shared;

interface IOwnProps {
  voteId: string;
  votingStatus: VotingStatus;
  yeaPercent: number;
  nayPercent: number;
}

type IProps = StylesProps & IOwnProps;

export default React.memo(provideStyles((props: IProps) => {

  const { classes, voteId, yeaPercent, nayPercent, votingStatus } = props;

  const [isRequesting, setIsRequesting] = React.useState(false);

  const { t } = useTranslate();
  return (
    <>
      <Grid container spacing={16} justify="center" direction="column">
        {votingStatus === 'execute-needed' &&
          <Grid item xs={12}>
            <ExecuteVoteButtonAsync
              fullWidth
              color="primary"
              variant="contained"
              voteId={voteId}
              onChangeCommunication={setIsRequesting}
              disabled={isRequesting}
            >
              {t(tKeys.executeVote.getKey())}
            </ExecuteVoteButtonAsync>
          </Grid>
        }
        {(votingStatus === 'confirmed' || votingStatus === 'rejected') &&
          <Grid item>
            <Grid container wrap="nowrap" alignItems="center" justify="center">
              {votingStatus === 'confirmed' && <Checked className={classes.votingForIcon} />}
              {votingStatus === 'rejected' && <ContainedCross className={classes.votingAgainstIcon} />}
              <Typography variant="h6" weight="medium">
                {votingStatus === 'confirmed' ? t(tKeys.approved.getKey()) : t(tKeys.declined.getKey())}
              </Typography>
            </Grid>
          </Grid>}
        <Grid item>
          <Grid container wrap="nowrap" spacing={16} justify="center">
            <Grid item>
              <Typography component="span" variant="subtitle1" weight="medium">
                {t(tKeysShared.yes.getKey())}
              </Typography>{' '}
              <Typography component="span" variant="subtitle1" weight="bold" className={classes.votingFor}>
                {formatPercent(yeaPercent)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="span" variant="subtitle1" weight="medium">
                {t(tKeysShared.no.getKey())}
              </Typography>{' '}
              <Typography component="span" variant="subtitle1" weight="bold" className={classes.votingAgainst}>
                {formatPercent(nayPercent)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}));
