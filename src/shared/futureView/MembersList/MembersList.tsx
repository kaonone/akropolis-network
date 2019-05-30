import * as React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { IFinanceHolder } from 'shared/types/models';
import { Table, TableBody, TableRow, TableCell, TableHead, Typography } from 'shared/view/elements';
import { UserAvatar } from 'shared/view/components';
import { usePagination } from 'shared/view/hooks';

import { StylesProps, provideStyles } from './MembersList.style';

const tKeys = tKeysAll.features.members;
const tKeysShared = tKeysAll.shared;

interface IOwnProps {
  members: IFinanceHolder[];
  userAccountAddress: string;
}

type IProps = StylesProps & IOwnProps;

export default React.memo(provideStyles((props: IProps) => {
  const { classes, members, userAccountAddress } = props;
  const { t } = useTranslate();

  const headerCells = [
    '#',
    t(tKeys.address.getKey()),
    t(tKeys.balance.getKey()),
    t(tKeys.deposit.getKey()),
    t(tKeys.withdraw.getKey()),
  ];

  const cellsAlign: Array<'left' | 'center' | 'right'> = ['center', 'left', 'right', 'right', 'right'];

  const userMember = members.find(item => item.address === userAccountAddress);
  const rows = userMember ? [userMember, ...members.filter(item => item.address !== userAccountAddress)] : members;

  const { items: paginatedRows, paginationView } = usePagination(rows);

  return (
    <div>
      <Table separated>
        <TableHead>
          <TableRow className={classes.header}>
            {headerCells.map((title, i) => (
              <TableCell key={i} align={cellsAlign[i]} className={classes.headerCell}>
                <Typography variant="subtitle1" className={classes.headerTitle}>{title}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row, i) => {
            const indexOrYou = userMember && i === 0 ? (
              <Typography variant="caption" weight="medium" className={classes.userTag}>
                {t(tKeysShared.you.getKey())}
              </Typography>) : i + 1;

            // tslint:disable:jsx-key
            const cells = [
              <Typography variant="body1" className={classes.memberNumber}>
                {indexOrYou}
              </Typography>,
              <UserAvatar address={row.address} />,
              <Typography variant="body2">{`${row.balance} DAI`}</Typography>,
              <Typography variant="body2">{`${row.deposit} DAI`}</Typography>,
              <Typography variant="body2">{`${row.withdraw} DAI`}</Typography>,
            ];
            // tslint:enable:jsx-key

            return (
              <TableRow key={i} className={classes.row}>
                {
                  cells.map((cell, k) =>
                    <TableCell
                      key={k}
                      className={classes.cell}
                      align={cellsAlign[k]}
                    >
                      {cell}
                    </TableCell>)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className={classes.pagination}>
        {paginationView}
      </div>
    </div>
  );
}));
