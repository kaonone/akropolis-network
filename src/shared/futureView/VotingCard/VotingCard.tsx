import * as React from 'react';
import * as cn from 'classnames';

import { VotingDecision } from 'shared/types/models/Voting';
import { VoteButtonAsync, ExecuteVoteButtonAsync } from 'features/vote';
import { Typography, Grid, CircleProgressBar } from 'shared/view/elements';
import { formatPercent, shortenString } from 'shared/helpers/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './VotingCard.style';
import VotingProgress from './VotingProgress/VotingProgress';
import {
  ContainedCircleArrow, OutlinedCircleArrow, Checked, ContainedCross, Receipt, AddPerson, Graphic,
} from 'shared/view/elements/Icons';

const tKeys = tKeysAll.features.voting;

const tKeysShared = tKeysAll.shared;

export const mockVote: IOwnProps<'withdraw'> = {
  id: '41',
  type: 'withdraw',
  votingParams: { withdraw: 120, addressTo: '0x1a5basdasdasdasdasd77a2' },
  timeLeft: '15 hours',
  neededPercent: 52,
  votedPercent: 43,
  // tslint:disable-next-line:max-line-length
  reason: `Hey guys, I broke an arm snowboarding and will have to miss a couple of months off work. Sadly, not covered by a regular insurance, could I request an insurance call? Will post a hash of doctor's note just in case. Thanks!`,
  voteForCount: 19,
  voteAgainstCount: 31,
  onVoteFor: console.log,
  onVoteAgainst: console.log,
};

type VotingType = 'withdraw' | 'join' | 'deposit';

type VotingResult = 'confirmed' | 'rejected';

interface IWithdrawVoting {
  withdraw: number;
  addressTo: string;
}

interface IJoinVoting {
  address: string;
}

interface IDepositVoting {
  withdraw: number;
}

type VotingParams<T extends VotingType> = {
  withdraw: IWithdrawVoting;
  deposit: IDepositVoting;
  join: IJoinVoting;
}[T];

interface IOwnProps<T extends VotingType> {
  id: string;
  type: VotingType;
  votingParams: VotingParams<T>;
  timeLeft: string;
  neededPercent: number;
  votedPercent: number;
  reason: string;
  votingDecision?: VotingDecision;
  votingResult?: VotingResult;
  voteForCount: number;
  voteAgainstCount: number;
  isNeedExecute?: boolean;
  onVoteFor(): void;
  onVoteAgainst(): void;
}

const VotingCard = <T extends VotingType>(props: StylesProps & IOwnProps<T>) => {
  const {
    classes, timeLeft, votedPercent, neededPercent, reason,
    voteForCount, voteAgainstCount, votingDecision,
    type, votingParams, votingResult, id, isNeedExecute,
  } = props;
  const { t } = useTranslate();

  const [expanded, setExpanded] = React.useState(false);
  const [isRequesting, setIsRequesting] = React.useState(false);

  const expandReason = React.useCallback(() => {
    setExpanded(true);
  }, []);

  const hideReason = React.useCallback(() => {
    setExpanded(false);
  }, []);

  const columnsByType: Record<VotingType, () => React.ReactNode> = {
    withdraw: () => (
      <>
        <Grid item xs container direction="column">
          <Grid container wrap="nowrap" alignItems="center">
            <Receipt className={classes.withdrawIcon} />
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>
              {t(tKeys.withdraw.getKey())}
            </Typography>
          </Grid>
          <Typography variant="h6">{`${(votingParams as IWithdrawVoting).withdraw} DAI`}</Typography>
        </Grid>
        <Grid item xs container direction="column">
          <Typography variant="overline" className={cn(classes.title, classes.grey)}>
            {t(tKeysShared.to.getKey())}
          </Typography>
          <Typography variant="h6" className={classes.address}>
            {shortenString((votingParams as IWithdrawVoting).addressTo, 10)}
          </Typography>
        </Grid>
      </>
    ),
    join: () => (
      <Grid item xs container direction="column">
        <Grid container wrap="nowrap" alignItems="center">
          <AddPerson className={classes.addPersonIcon} />
          <Typography variant="overline" className={cn(classes.title, classes.grey)}>
            {t(tKeys.join.getKey())}
          </Typography>
        </Grid>
        <Typography variant="h6" className={classes.address}>
          {shortenString((votingParams as IJoinVoting).address, 10)}
        </Typography>
      </Grid>
    ),
    deposit: () => (
      <>
        <Grid item xs container direction="column">
          <Grid container wrap="nowrap" alignItems="center">
            <Graphic className={classes.votingTypeIcon} />
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>
              {t(tKeys.deposit.getKey())}
            </Typography>
          </Grid>
          <Typography variant="h6">{`${(votingParams as IDepositVoting).withdraw} DAI`}</Typography>
        </Grid>
        <Grid item xs container direction="column">
          <Typography variant="overline" className={cn(classes.title, classes.grey)}>
            {t(tKeysShared.to.getKey())}
          </Typography>
          <Typography variant="h6">{t(tKeys.compound.getKey())}</Typography>
        </Grid>
      </>
    ),
  };

  return (
    <Grid className={classes.root} container wrap="nowrap">
      <Grid item xs={9} className={classes.mainInformation}>
        <Grid container spacing={16}>
          {columnsByType[type]()}
          <Grid item xs={3} container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.purple)}>
              {t(tKeys.timeLeft.getKey())}
            </Typography>
            <Typography variant="h6" className={cn(classes.value, classes.purple)}>{timeLeft}</Typography>
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
                {`${formatPercent(neededPercent)} ${t(tKeys.needed.getKey())}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} zeroMinWidth container wrap="nowrap">
            {expanded && <ContainedCircleArrow className={classes.toggleExpandIcon} onClick={hideReason} />}
            {!expanded && <OutlinedCircleArrow className={classes.toggleExpandIcon} onClick={expandReason} />}
            <Typography className={cn(classes.reason, { [classes.expanded]: expanded })} variant="body2">
              <span className={classes.reasonFirstWord}>{`${t(tKeys.reason.getKey())}:`}</span>{' '}{reason}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {!votingResult && <Grid item xs={3} className={classes.voting}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <VotingProgress title={t(tKeysShared.yes.getKey())} value={voteForCount} type="for" />
          </Grid>
          <Grid item xs={12}>
            <VotingProgress title={t(tKeysShared.no.getKey())} value={voteAgainstCount} type="against" />
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

            if (votingDecision) {
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

            if (!votingDecision) {
              return (
                <>
                  <Grid item xs={6}>
                    <VoteButtonAsync
                      fullWidth
                      color="purple"
                      voteId={id}
                      decisionType="confirm"
                      onChangeCommunication={setIsRequesting}
                    >
                      {t(tKeysShared.yes.getKey())}
                    </VoteButtonAsync>
                  </Grid>
                  <Grid item xs={6}>
                    <VoteButtonAsync
                      fullWidth
                      color="purple"
                      voteId={id}
                      decisionType="reject"
                      onChangeCommunication={setIsRequesting}
                    >
                      {t(tKeysShared.no.getKey())}
                    </VoteButtonAsync>
                  </Grid>
                </>);
            }
          })()}
        </Grid>
      </Grid>}
      {votingResult &&
        <Grid item xs={2} className={classes.votingResult}>
          <Grid container spacing={16} justify="center" direction="column">
            {isNeedExecute &&
              <Grid item xs={12}>
                <ExecuteVoteButtonAsync fullWidth color="purple" voteId={id} onChangeCommunication={setIsRequesting}>
                  {t(tKeys.executeVote.getKey())}
                </ExecuteVoteButtonAsync>
              </Grid>
            }
            {!isNeedExecute &&
              <Grid item>
                <Grid container wrap="nowrap" alignItems="center">
                  {votingResult === 'confirmed' && <Checked className={classes.votingForIcon} />}
                  {votingResult === 'rejected' && <ContainedCross className={classes.votingAgainstIcon} />}
                  <Typography variant="h6" weight="medium">
                    {votingResult === 'confirmed' ? t(tKeys.approve.getKey()) : t(tKeys.decline.getKey())}
                  </Typography>
                </Grid>
              </Grid>}
            <Grid item>
              <Grid container wrap="nowrap" spacing={16} justify={isNeedExecute ? 'center' : 'flex-start'}>
                <Grid item>
                  <Typography component="span" variant="subtitle1" weight="medium">
                    {t(tKeysShared.no.getKey())}
                  </Typography>{' '}
                  <Typography component="span" variant="subtitle1" weight="bold" className={classes.votingFor}>
                    {formatPercent(voteForCount)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="span" variant="subtitle1" weight="medium">
                    {t(tKeysShared.no.getKey())}
                  </Typography>{' '}
                  <Typography component="span" variant="subtitle1" weight="bold" className={classes.votingAgainst}>
                    {formatPercent(voteAgainstCount)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </Grid>
  );
};

type StubForVotingCard = <T extends VotingType>(props: IOwnProps<T>) => JSX.Element;
export default React.memo(provideStyles(VotingCard)) as StubForVotingCard;
