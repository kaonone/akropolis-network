import * as React from 'react';
import * as cn from 'classnames';
import { Table, TableBody, TableRow, TableCell, Avatar, Typography } from 'shared/view/elements';
import { ICooperative } from 'shared/types/models/Cooperative';
import { formatUSD } from 'shared/helpers/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { ComplexCell, EventCell } from './cells';
import { StylesProps, provideStyles } from './CooperativesList.style';

const tKeys = tKeysAll.shared.dao;

const cooperative: ICooperative = {
  name: 'Fincoop uniq',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  balance: 2192,
  membersCount: 24,
  goal: 102,
};

export const cooperativesMock: ICooperative[] = [
  { ...cooperative, description: cooperative.description + ' ' + cooperative.description },
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
            <Avatar>{row.name.slice(0, 2).toUpperCase()}</Avatar>,
            <Typography variant="body1">{row.name}</Typography>,
            <Typography variant="body1" className={classes.description}>{row.description}</Typography>,
            <ComplexCell title={t(tKeys.balance.getKey())} value={formatUSD(row.balance)} />,
            <ComplexCell title={t(tKeys.members.getKey())} value={row.membersCount} />,
            <EventCell event={row.eventType} />,
          ];
          // tslint:enable:jsx-key
          const lastCellIndex = cells.length - 1;

          return (
            <TableRow key={i} className={cn(classes.row, { [classes.active]: row.eventType === 'new' })}>
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
        })}
      </TableBody>
    </Table>
  );
}));
