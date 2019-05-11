import * as React from 'react';
import * as cn from 'classnames';
import { Table, TableBody, TableRow, TableCell, Avatar } from 'shared/view/elements';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { ComplexCell, EventCell } from './cells';
import { StylesProps, provideStyles } from './CooperativesList.style';
import { ICooperative } from 'shared/types/models/Cooperative';

const tKeys = tKeysAll.shared.dao;

const cooperative: ICooperative = {
  name: 'Fincoop uniq',
  goal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  balance: 2192,
  membersCount: 24,
};

export const cooperativesMock: ICooperative[] = [
  { ...cooperative, goal: cooperative.goal + ' ' + cooperative.goal },
  { ...cooperative, name: 'Uniq fincoop' },
  { ...cooperative, eventType: 'new' },
  { ...cooperative, eventType: 'reviewed' },
];

interface IOwnProps {
  cooperatives: ICooperative[];
}

type IProps = StylesProps & IOwnProps;

export default React.memo(provideStyles((props: IProps) => {
  const { classes, cooperatives } = props;
  const { t } = useTranslate();

  return (
    <Table separated>
      <TableBody>
        {cooperatives.map((row, i) => {

          // tslint:disable:jsx-key
          const cells = [
            <Avatar className={classes.avatar}>{row.name.slice(0, 2).toUpperCase()}</Avatar>,
            row.name,
            <div className={classes.goal}>{row.goal}</div>,
            <ComplexCell title={t(tKeys.balance.getKey())} value={row.balance} />,
            <ComplexCell title={t(tKeys.members.getKey())} value={row.membersCount} />,
            <EventCell event={row.eventType} />,
          ];
          // tslint:enable:jsx-key

          return (
            <TableRow key={i} className={cn(classes.row, { [classes.active]: row.eventType === 'new' })}>
              {
                cells.map((cell, k) =>
                  <TableCell
                    key={k}
                    align={k === cells.length - 1 ? 'right' : 'left'}
                    className={classes.cell}
                  >
                    {cell}
                  </TableCell>)}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}));
