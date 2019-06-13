import * as React from 'react';
import * as cn from 'classnames';
import * as moment from 'moment';
import { useObserver } from 'mobx-react-lite';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useIsMember } from 'services/user';
import { useDaoApi } from 'services/daoApi';

import { VotingDecision, IVoting, VotingStatus } from 'shared/types/models/Voting';
import { formatPercent } from 'shared/helpers/format';
import { votingTimeout, calculateVotingStats, useVotingStatus } from 'shared/helpers/voting';
import { Typography, Grid } from 'shared/view/elements';
import { ContainedCircleArrow, OutlinedCircleArrow } from 'shared/view/elements/Icons';

import VotingProgress from './VotingProgress/VotingProgress';
import VotingResult from './VotingResult/VotingResult';
import Intent from './Intent/Intent';

import { StylesProps, provideStyles } from './VotingCard.style';

const endedVotingStatuses: VotingStatus[] = ['execute-needed', 'confirmed', 'rejected'];

const tKeys = tKeysAll.features.voting;

interface IOwnProps {
  voting: IVoting;
  votingDecision: VotingDecision;
  canVote: boolean;
}

function VotingCard(props: StylesProps & IOwnProps) {
  const { classes, votingDecision, voting, canVote } = props;
  const { id, intent, startDate, minAcceptQuorum } = voting;
  const { t } = useTranslate();
  const daoApi = useDaoApi();
  const isMember = useIsMember(daoApi);

  const [expanded, setExpanded] = React.useState(false);

  const expandReason = React.useCallback(() => {
    setExpanded(true);
  }, []);

  const hideReason = React.useCallback(() => {
    setExpanded(false);
  }, []);

  const renderColumn = React.useCallback((title: string, value: string, subValue?: string) => (
    <Grid item xs={3} container direction="column">
      <Typography variant="overline" className={cn(classes.title, classes.purple)}>
        {title}
      </Typography>
      <Grid container alignItems="baseline">
        <Typography variant="h6" className={cn(classes.value, classes.purple)}>
          {value}
        </Typography>
        {subValue &&
          <Typography variant="subtitle1" className={classes.subValue}>
            {subValue}
          </Typography>
        }
      </Grid>
    </Grid>
  ), [voting]);

  const voteTime = useObserver(() => daoApi.store.voting.config.voteTime);

  const { timeLeft } = votingTimeout(startDate, voteTime);

  const { votedPercent, nayPercentByPower, yeaPercentByPower } = calculateVotingStats(voting);
  const votingStatus = useVotingStatus(daoApi, voting);

  const isOver = endedVotingStatuses.includes(votingStatus);

  const timeLeftTitle = isOver
    ? t(tKeys.timeEnded.getKey())
    : t(tKeys.timeLeft.getKey());

  const timeLeftValue = isOver
    ? moment(Math.min(startDate + voteTime, Date.now())).format('DD MMM')
    : moment.duration(timeLeft).humanize();

  return (
    <Grid className={classes.root} container wrap="nowrap">
      <Grid item xs={9} className={classes.mainInformation}>
        <Grid container spacing={16}>
          <Intent intent={intent} />
          {renderColumn(timeLeftTitle, timeLeftValue)}
          {renderColumn(
            t(tKeys.voted.getKey()),
            formatPercent(votedPercent),
            `${formatPercent(minAcceptQuorum)} ${t(tKeys.needed.getKey())}`,
          )}
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
      {!isOver &&
        <Grid item xs={3} className={classes.voting}>
          <VotingProgress
            voteId={id}
            votingDecision={votingDecision}
            yeaPercent={yeaPercentByPower}
            nayPercent={nayPercentByPower}
            showVoteButtons={canVote}
          />
        </Grid>}
      {isOver &&
        <Grid item xs={3} className={classes.votingResult}>
          <VotingResult
            voteId={id}
            votingStatus={votingStatus}
            yeaPercent={yeaPercentByPower}
            nayPercent={nayPercentByPower}
            canExecute={isMember}
          />
        </Grid>
      }
    </Grid>
  );
}

export default React.memo(provideStyles(VotingCard));
