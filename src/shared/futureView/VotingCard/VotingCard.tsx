import * as React from 'react';
import * as cn from 'classnames';
import * as moment from 'moment';
import { useObserver } from 'mobx-react-lite';

import { VotingDecision, IVoting } from 'shared/types/models/Voting';
import { VoteButtonAsync, ExecuteVoteButtonAsync } from 'features/vote';
import { Typography, Grid, CircleProgressBar } from 'shared/view/elements';
import { formatPercent, shortenString } from 'shared/helpers/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import {
  ContainedCircleArrow, OutlinedCircleArrow, Checked, ContainedCross, Receipt, AddPerson, Graphic,
} from 'shared/view/elements/Icons';
import { useDaoApi } from 'services/daoApi';
import { votingTimeout, calculateVotingResult } from 'shared/helpers/voting';

import { StylesProps, provideStyles } from './VotingCard.style';
import VotingProgress from './VotingProgress/VotingProgress';

const tKeys = tKeysAll.features.voting;

const tKeysShared = tKeysAll.shared;

interface IOwnProps {
  voting: IVoting;
  votingDecision: VotingDecision;
  canVote: boolean;
}

function VotingCard(props: StylesProps & IOwnProps) {
  const { classes, votingDecision, voting, canVote } = props;
  const { id, intent, startDate, minAcceptQuorum, executed } = voting;
  const { t } = useTranslate();
  const daoApi = useDaoApi();

  const [expanded, setExpanded] = React.useState(false);
  const [isRequesting, setIsRequesting] = React.useState(false);

  const expandReason = React.useCallback(() => {
    setExpanded(true);
  }, []);

  const hideReason = React.useCallback(() => {
    setExpanded(false);
  }, []);

  const renderIntentColumns = React.useCallback(() => {
    switch (intent.type) {
      case 'withdrawRequest': return (
        <>
          <Grid item xs container direction="column">
            <Grid container wrap="nowrap" alignItems="center">
              <Receipt className={classes.withdrawIcon} />
              <Typography variant="overline" className={cn(classes.title, classes.grey)}>
                {t(tKeys.withdraw.getKey())}
              </Typography>
            </Grid>
            <Typography variant="h6">{`${intent.payload.amount} DAI`}</Typography>
          </Grid>
          <Grid item xs container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>
              {t(tKeysShared.to.getKey())}
            </Typography>
            <Typography variant="h6" className={classes.address}>
              {shortenString(intent.payload.to, 10)}
            </Typography>
          </Grid>
        </>
      );
      case 'joinToDao': return (
        <Grid item xs container direction="column">
          <Grid container wrap="nowrap" alignItems="center">
            <AddPerson className={classes.addPersonIcon} />
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>
              {t(tKeys.join.getKey())}
            </Typography>
          </Grid>
          <Typography variant="h6" className={classes.address}>
            {shortenString(intent.payload.address, 10)}
          </Typography>
        </Grid>
      );
      case 'invest': return (
        <>
          <Grid item xs container direction="column">
            <Grid container wrap="nowrap" alignItems="center">
              <Graphic className={classes.votingTypeIcon} />
              <Typography variant="overline" className={cn(classes.title, classes.grey)}>
                {t(tKeys.deposit.getKey())}
              </Typography>
            </Grid>
            <Typography variant="h6">{`${intent.payload.amount} DAI`}</Typography>
          </Grid>
          <Grid item xs container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>
              {t(tKeysShared.to.getKey())}
            </Typography>
            <Typography variant="h6">{intent.payload.to}</Typography>
          </Grid>
        </>
      );
      default: return <noscript />;
    }
  }, [intent]);

  const voteTime = useObserver(() => daoApi.store.voting.config.voteTime);

  const { timeLeft, isOutdated } = votingTimeout(startDate, voteTime);

  const isOver = executed || isOutdated;

  const { votedPercent, nayPercentByPower, yeaPercentByPower, votingResult } = calculateVotingResult(voting);
  return (
    <Grid className={classes.root} container wrap="nowrap">
      <Grid item xs={9} className={classes.mainInformation}>
        <Grid container spacing={16}>
          {renderIntentColumns()}
          <Grid item xs={3} container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.purple)}>
              {t(tKeys.timeLeft.getKey())}
            </Typography>
            <Typography variant="h6" className={cn(classes.value, classes.purple)}>
              {isOver
                ? t(tKeys.timeEnded.getKey())
                : moment.duration(timeLeft).humanize()
              }
            </Typography>
          </Grid>
          <Grid item xs={3} container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.purple)}>
              {t(tKeys.voted.getKey())}
            </Typography>
            <Grid container alignItems="baseline">
              <Typography variant="h6" className={cn(classes.value, classes.purple)}>
                {formatPercent(votedPercent)}
              </Typography>
              <Typography variant="subtitle1" className={classes.subValue}>
                {`${formatPercent(minAcceptQuorum)} ${t(tKeys.needed.getKey())}`}
              </Typography>
            </Grid>
          </Grid>
          {(intent.type === 'withdrawRequest' || intent.type === 'invest') && (
            <Grid item xs={12} zeroMinWidth container wrap="nowrap">
              {expanded && <ContainedCircleArrow className={classes.toggleExpandIcon} onClick={hideReason} />}
              {!expanded && <OutlinedCircleArrow className={classes.toggleExpandIcon} onClick={expandReason} />}
              <Typography className={cn(classes.reason, { [classes.expanded]: expanded })} variant="body2">
                <span className={classes.reasonFirstWord}>{`${t(tKeys.reason.getKey())}:`}</span>
                {' '}{intent.payload.reason}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      {!isOver && <Grid item xs={3} className={classes.voting}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <VotingProgress title={t(tKeysShared.yes.getKey())} value={yeaPercentByPower} type="for" />
          </Grid>
          <Grid item xs={12}>
            <VotingProgress title={t(tKeysShared.no.getKey())} value={nayPercentByPower} type="against" />
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

            if (votingDecision === 'absent' && canVote) {
              return (
                <>
                  <Grid item xs={6}>
                    <VoteButtonAsync
                      fullWidth
                      color="primary"
                      variant="contained"
                      voteId={id}
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
                      voteId={id}
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
      </Grid>}
      {isOver &&
        <Grid item xs={3} className={classes.votingResult}>
          <Grid container spacing={16} justify="center" direction="column">
            {votingResult === 'confirmed' && !executed &&
              <Grid item xs={12}>
                <ExecuteVoteButtonAsync
                  fullWidth
                  color="primary"
                  variant="contained"
                  voteId={id}
                  onChangeCommunication={setIsRequesting}
                  disabled={isRequesting}
                >
                  {t(tKeys.executeVote.getKey())}
                </ExecuteVoteButtonAsync>
              </Grid>
            }
            {(votingResult === 'rejected' || executed) &&
              <Grid item>
                <Grid container wrap="nowrap" alignItems="center" justify="center">
                  {votingResult === 'confirmed' && <Checked className={classes.votingForIcon} />}
                  {votingResult === 'rejected' && <ContainedCross className={classes.votingAgainstIcon} />}
                  <Typography variant="h6" weight="medium">
                    {votingResult === 'confirmed' ? t(tKeys.approved.getKey()) : t(tKeys.declined.getKey())}
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
                    {formatPercent(yeaPercentByPower)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="span" variant="subtitle1" weight="medium">
                    {t(tKeysShared.no.getKey())}
                  </Typography>{' '}
                  <Typography component="span" variant="subtitle1" weight="bold" className={classes.votingAgainst}>
                    {formatPercent(nayPercentByPower)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </Grid>
  );
}

export default React.memo(provideStyles(VotingCard));
