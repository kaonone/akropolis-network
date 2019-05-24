import * as React from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, Typography } from 'shared/view/elements';
import { IMember } from 'shared/types/models/Member';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { UserAvatar } from 'shared/view/components';

import { StylesProps, provideStyles } from './MembersList.style';

const tKeys = tKeysAll.features.members;
const tKeysShared = tKeysAll.shared;

export const memberMock: IMember = {
  address: '0x44166e7a9aa68ea990bfa2e43bd983f2f0c37806',
  balance: 30,
  debit: 23,
  credit: 7,
};

export const membersMock: IMember[] = [
  { ...memberMock, address: '0xBF6FD43t7C13ad52394B4qe9B57bC606f4B7632B' },
  { ...memberMock, address: '0x54166e7a9aa68ea999bfa2e43bd983f2f0c37806' },
  { ...memberMock, address: '0x64166e711aa68ea990bfa2e43bdaq3f2f0c37806' },
  { ...memberMock, address: '0x1aoh4eta9a7g6ear40bfa2123kqorme9f0c37a4r' },
];

interface IOwnProps {
  members: IMember[];
  userAccount?: IMember;
}

type IProps = StylesProps & IOwnProps;

export default React.memo(provideStyles((props: IProps) => {
  const { classes, members, userAccount } = props;
  const { t } = useTranslate();

  const headerCells = [
    '#',
    t(tKeys.address.getKey()),
    t(tKeys.balance.getKey()),
    t(tKeys.debit.getKey()),
    t(tKeys.credit.getKey()),
  ];

  const cellsAlign: Array<'left' | 'center' | 'right'> = ['center', 'left', 'right', 'right', 'right'];

  const rows = userAccount ? [userAccount, ...members] : members;
  return (
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
        {rows.map((row, i) => {
          const indexWithUserAccount = i !== 0 ? i + 1 : (
            <Typography variant="caption" weight="medium" className={classes.userTag}>
              {t(tKeysShared.you.getKey())}
            </Typography>);

          // tslint:disable:jsx-key
          const cells = [
            <Typography variant="body1" className={classes.memberNumber}>
              {userAccount ? indexWithUserAccount : i}
            </Typography>,
            <UserAvatar address={row.address}/>,
            <Typography variant="body2">{`${row.balance} DAI`}</Typography>,
            <Typography variant="body2">{`${row.debit} DAI`}</Typography>,
            <Typography variant="body2">{`${row.credit} DAI`}</Typography>,
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
  );
}));
