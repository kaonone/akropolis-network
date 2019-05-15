import * as React from 'react';
import * as cn from 'classnames';
import { Typography, Grid, Button } from 'shared/view/elements';
import { formatPercent, shortenString } from 'shared/helpers/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './VotingCard.style';
import VotingProgress from './VotingProgress/VotingProgress';
import {
  ContainedCircleArrow, OutlinedCircleArrow, Checked, ContainedCross, Receipt, AddPerson,
} from 'shared/view/elements/Icons';

const tKeys = tKeysAll.features.voting;

const tKeysShared = tKeysAll.shared;

// tslint:disable:max-line-length
export const mockVote: IOwnProps<'withdraw'> = {
  type: 'withdraw',
  votingParams: { withdraw: 120, addressTo: '0x1a5basdasdasdasdasd77a2' },
  timeLeft: '15 hours',
  neededPercent: 52,
  votedPercent: 43,
  reason: `Hey guys, I broke an arm snowboarding and will have to miss a couple of months off work. Sadly, not covered by a regular insurance, could I request an insurance call? Will post a hash of doctor's note just in case. Thanks!`,
  voteForCount: 19,
  voteAgainstCount: 31,
  onVoteFor: console.log,
  onVoteAgainst: console.log,
};

type VotingType = 'withdraw' | 'join';

type VotingDecision = 'for' | 'against';

interface IWithdrawVoting {
  withdraw: number;
  addressTo: string;
}

interface IJoinVoting {
  address: string;
}

type VotingParams<T extends VotingType> = T extends 'withdraw' ? IWithdrawVoting : IJoinVoting;

interface IOwnProps<T extends VotingType> {
  type: VotingType;
  votingParams: VotingParams<T>;
  timeLeft: string;
  neededPercent: number;
  votedPercent: number;
  reason: string;
  votingDecision?: VotingDecision;
  voteForCount: number;
  voteAgainstCount: number;
  onVoteFor(): void;
  onVoteAgainst(): void;
}

const VotingCard = <T extends VotingType>(props: StylesProps & IOwnProps<T>) => {
  const {
    classes, timeLeft, votedPercent, neededPercent, reason,
    voteForCount, voteAgainstCount, onVoteFor, onVoteAgainst, votingDecision,
    type, votingParams,
  } = props;
  const { t } = useTranslate();

  const [expanded, setExpanded] = React.useState(false);

  const expandReason = React.useCallback(() => {
    setExpanded(true);
  }, []);

  const hideReason = React.useCallback(() => {
    setExpanded(false);
  }, []);

  const columnsByType: Record<VotingType, () => React.ReactNode> = {
    withdraw: () => (
      <>
        <Grid container direction="column">
          <Grid container wrap="nowrap" alignItems="center">
            <Receipt className={classes.withdrawIcon} />
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>{t(tKeys.withdraw.getKey())}</Typography>
          </Grid>
          <Typography variant="h6">{`${(votingParams as IWithdrawVoting).withdraw} DAI`}</Typography>
        </Grid>
        <Grid container direction="column">
          <Typography variant="overline" className={cn(classes.title, classes.grey)}>{t(tKeysShared.to.getKey())}</Typography>
          <Typography variant="h6" className={classes.addressTo}>{shortenString((votingParams as IWithdrawVoting).addressTo, 10)}</Typography>
        </Grid>
      </>
    ),
    join: () => (
      <Grid container direction="column">
        <Grid container wrap="nowrap" alignItems="center">
          <AddPerson className={classes.addPersonIcon} />
          <Typography variant="overline" className={cn(classes.title, classes.grey)}>{t(tKeys.join.getKey())}</Typography>
        </Grid>
        <Typography variant="h6">{shortenString((votingParams as IJoinVoting).address, 10)}</Typography>
      </Grid>
    ),
  };

  return (
    <Grid className={classes.root} container wrap="nowrap">
      <Grid container zeroMinWidth wrap="nowrap" direction="column" className={classes.mainInformation}>
        <Grid className={classes.metrics} container wrap="nowrap">
          <Grid container wrap="nowrap" >
            {columnsByType[type]()}
          </Grid>
          <Grid container wrap="nowrap" >

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
        {!votingDecision &&
          <Grid container wrap="nowrap" justify="space-between">
            <Button className={classes.votingButton} color="purple" onClick={onVoteFor}>{t(tKeysShared.yes.getKey())}</Button>
            <Button className={classes.votingButton} color="purple" onClick={onVoteAgainst}>{t(tKeysShared.no.getKey())}</Button>
          </Grid>}
        {votingDecision &&
          <Grid container wrap="nowrap" className={classes.votingDecision} justify="center">
            {votingDecision === 'for' && <Checked className={classes.votingForIcon} />}
            {votingDecision === 'against' && <ContainedCross className={classes.votingAgainstIcon} />}
            <Typography weight="medium">
              {votingDecision === 'for' ? t(tKeysShared.yes.getKey()) : t(tKeysShared.no.getKey())}
            </Typography>
          </Grid>}
      </Grid>
    </Grid>
  );
};

type StubForVotingCard = <T extends VotingType>(props: IOwnProps<T>) => JSX.Element;
export default React.memo(provideStyles(VotingCard)) as StubForVotingCard;
