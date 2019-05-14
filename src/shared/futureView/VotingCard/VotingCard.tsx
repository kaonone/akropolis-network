import * as React from 'react';
import * as cn from 'classnames';
import { Typography, Grid, Button } from 'shared/view/elements';
import { formatPercent, shortenString } from 'shared/helpers/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './VotingCard.style';
import VotingProgress from './VotingProgress/VotingProgress';
import { ContainedCircleArrow, OutlinedCircleArrow } from 'shared/view/elements/Icons';

const tKeys = tKeysAll.features.voting;

const tKeysShared = tKeysAll.shared;

// tslint:disable:max-line-length
export const mockVote: IOwnProps = {
  withdraw: 120,
  addressTo: '0x1a5basdasdasdasdasd77a2',
  timeLeft: '15 hours',
  neededPercent: 52,
  votedPercent: 43,
  reason: `Hey guys, I broke an arm snowboarding and will have to miss a couple of months off work. Sadly, not covered by a regular insurance, could I request an insurance call? Will post a hash of doctor's note just in case. Thanks!`,
  voteForCount: 19,
  voteAgainstCount: 31,
  onVoteFor: console.log,
  onVoteAgainst: console.log,
};

type VoteDecision = 'for' | 'against';

interface IOwnProps {
  withdraw: number;
  addressTo: string;
  timeLeft: string;
  neededPercent: number;
  votedPercent: number;
  reason: string;
  votingDecision?: VoteDecision;
  voteForCount: number;
  voteAgainstCount: number;
  onVoteFor(): void;
  onVoteAgainst(): void;
}

type IProps = StylesProps & IOwnProps;

export default React.memo(provideStyles((props: IProps) => {
  const {
    classes, withdraw, addressTo, timeLeft, votedPercent, neededPercent, reason,
    voteForCount, voteAgainstCount, onVoteFor, onVoteAgainst,
  } = props;
  const { t } = useTranslate();

  const [expanded, setExpanded] = React.useState(false);

  const expandReason = React.useCallback(() => {
    setExpanded(true);
  }, []);

  const hideReason = React.useCallback(() => {
    setExpanded(false);
  }, []);

  return (
    <Grid className={classes.root} container wrap="nowrap">
      <Grid container wrap="nowrap" direction="column" className={classes.mainInformation}>
        <Grid className={classes.metrics} container wrap="nowrap">
          <Grid container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>{t(tKeys.withdraw.getKey())}</Typography>
            <Typography variant="h6">{`${withdraw} DAI`}</Typography>
          </Grid>
          <Grid container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>{t(tKeysShared.to.getKey())}</Typography>
            <Typography variant="h6" className={classes.addressTo}>{shortenString(addressTo, 10)}</Typography>
          </Grid>
          <Grid container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.purple)}>{t(tKeys.timeLeft.getKey())}</Typography>
            <Typography variant="h6" className={cn(classes.value, classes.purple)}>{timeLeft}</Typography>
          </Grid>
          <Grid container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.purple)}>{t(tKeys.voted.getKey())}</Typography>
            <Grid container alignItems="baseline">
              <Typography variant="h6" className={cn(classes.value, classes.purple)}>{formatPercent(votedPercent)}</Typography>
              <Typography variant="subtitle1" className={classes.subValue}>{`${formatPercent(neededPercent)} ${t(tKeys.needed.getKey())}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container wrap="nowrap">
          {expanded && <ContainedCircleArrow className={classes.toggleExpandIcon} onClick={hideReason} />}
          {!expanded && <OutlinedCircleArrow className={classes.toggleExpandIcon} onClick={expandReason} />}
          <Typography className={cn(classes.reason, { [classes.expanded]: expanded })} variant="body2">
            <span className={classes.reasonFirstWord}>{`${t(tKeys.reason.getKey())}:`}</span>{' '}{reason}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.voting}>
        <Grid className={classes.votingProgress}><VotingProgress title={t(tKeysShared.yes.getKey())} value={voteForCount} type="for" /></Grid>
        <Grid className={classes.votingProgress}><VotingProgress title={t(tKeysShared.no.getKey())} value={voteAgainstCount} type="against" /></Grid>
        <Grid container wrap="nowrap" justify="space-between">
          <Button className={classes.votingButton} color="purple" onClick={onVoteFor}>{t(tKeysShared.yes.getKey())}</Button>
          <Button className={classes.votingButton} color="purple" onClick={onVoteAgainst}>{t(tKeysShared.no.getKey())}</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}));
