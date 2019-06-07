import * as React from 'react';
import * as cn from 'classnames';
import { useObserver } from 'mobx-react-lite';

import { useAccountAddress } from 'services/user';
import {
  Table, TableBody, TableRow, TableCell,
  Avatar, Typography, CircleProgressBar, Grid,
} from 'shared/view/elements';
import { ICooperative } from 'shared/types/models/Cooperative';
import { formatDAI } from 'shared/helpers/format';
import { DaoApi, DAO_DESCRIPTION, DAO_GOAL } from 'services/daoApi';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { usePagination } from 'shared/view/hooks';
import { useCommunication } from 'shared/helpers/react';
import { useNewVotingEvents, useHasActiveJoinVoting } from 'shared/helpers/voting';

import { ComplexCell, EventCell, JoinCell } from './cells';
import { StylesProps, provideStyles } from './CooperativesList.style';

const tKeys = tKeysAll.shared.dao;

const DAO_IDS = ['Cooperative1', 'Cooperative2', 'Cooperative3'];

interface IOwnProps {
  onSelectCooperative(daoName: string): void;
}

type IProps = StylesProps & IOwnProps;

export default React.memo(provideStyles((props: IProps) => {
  const { classes, onSelectCooperative } = props;
  const { items: daoNames, paginationView } = usePagination(DAO_IDS);

  return (
    <div>
      <Table separated>
        <TableBody>
          {daoNames.map((daoName, i) => (<Row key={i} daoName={daoName} onSelect={onSelectCooperative} />))}
        </TableBody>
      </Table>
      <div className={classes.pagination}>
        {paginationView}
      </div>
    </div>
  );
}));

interface IRowProps {
  daoName: string;
  onSelect(daoName: string): void;
}

const Row = React.memo(provideStyles((props: IRowProps & StylesProps) => {

  const { classes, daoName, onSelect } = props;

  const daoApiCreating = useCommunication(() => DaoApi.getDaoApiOrCreate(daoName), [daoName]);
  React.useEffect(daoApiCreating.execute, [daoName]);

  if (daoApiCreating.status !== 'success' || !daoApiCreating.result) {
    return (
      <TableRow className={classes.row}>
        <TableCell colSpan={100} className={classes.cell} >
          <Grid container justify="center">
            <CircleProgressBar size={32} />
          </Grid>
        </TableCell>
      </TableRow>);
  }

  return <Cooperative daoName={daoName} onSelect={onSelect} daoApi={daoApiCreating.result} />;
}));

interface ICooperativeProps extends IRowProps {
  daoApi: DaoApi;
}

const Cooperative = React.memo(provideStyles((props: ICooperativeProps & StylesProps) => {
  const { daoName, onSelect, classes, daoApi } = props;
  const { t } = useTranslate();

  const onClickHandle = React.useCallback(() => onSelect(daoName), [daoName]);

  const account = useAccountAddress();
  const balance = useObserver(() => daoApi.store.finance.daoOverview.balance.value);
  const holders = useObserver(() => daoApi.store.tokenManager.holders);
  const votes = useObserver(() => daoApi.store.voting.votings);

  const newEvents = useNewVotingEvents(daoApi, Object.values(votes));

  const hasNewEvent = newEvents.length > 0;
  const userIsInCoop = !!holders[account];
  const hasActiveJoinVoting: boolean = useHasActiveJoinVoting(daoApi, Object.values(votes));

  const cooperative: ICooperative = {
    name: daoName,
    balance,
    membersCount: Object.values(holders).length,
    description: DAO_DESCRIPTION,
    goal: DAO_GOAL,
  };

  // tslint:disable:jsx-key
  const cells = [
    <Avatar>{cooperative.name.slice(0, 2).toUpperCase()}</Avatar>,
    <Typography variant="body1">{cooperative.name}</Typography>,
    <Typography variant="body1" className={classes.description}>{cooperative.description}</Typography>,
    <ComplexCell title={t(tKeys.goal.getKey())} value={formatDAI(cooperative.goal)} />,
    <ComplexCell title={t(tKeys.balance.getKey())} value={formatDAI(cooperative.balance)} />,
    <ComplexCell title={t(tKeys.members.getKey())} value={cooperative.membersCount} />,
  ].concat(
    !userIsInCoop && <JoinCell pending={hasActiveJoinVoting} /> ||
    hasNewEvent && <EventCell /> ||
    <div />,
  );

  // tslint:enable:jsx-key
  const lastCellIndex = cells.length - 1;

  return (
    <TableRow
      onClick={onClickHandle}
      className={cn(classes.row, { [classes.active]: hasNewEvent })}
    >
      {
        cells.map((cell, k) =>
          <TableCell
            key={k}
            align={k === lastCellIndex ? 'right' : 'left'}
            className={classes.cell}
          >
            {cell}
          </TableCell>)}
    </TableRow>
  );
}));
