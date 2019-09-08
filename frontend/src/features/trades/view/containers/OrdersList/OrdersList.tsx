import * as React from 'react';
import { connect } from 'react-redux';
import Countdown, { CountdownRenderProps } from 'react-countdown-now';

import { NETWORK_CONFIG } from 'core/constants';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { selectors } from 'services/trades';
import { IAppReduxState } from 'shared/types/app';
import { IAirSwapOrder } from 'shared/types/models';
import { Table, TableHead, TableRow, TableCell, Typography, TableBody } from 'shared/view/elements';
import { usePagination } from 'shared/view/hooks';
import { ERC20Balance } from 'shared/view/components';
import { withComponent } from 'shared/helpers/react';

import { StylesProps, provideStyles } from './OrdersList.style';

interface IProps {
  orders: IAirSwapOrder[];
}

const tKeys = tKeysAll.features.orders;

const TypographyA = withComponent('a')(Typography);

const expiredRenderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
  if (completed) {
    return 'Expired';
  } else {
    return (
      <span>
        {days ? `${days}d ` : ''}
        {(days || hours) ? `${hours}h ` : ''}
        {(days || hours || minutes) ? `${minutes}m` : ''}
        {(!days && !hours && !minutes) ? `${seconds}s` : ''}
      </span>
    );
  }
};

function OrdersList(props: IProps & StylesProps) {
  const { orders, classes } = props;

  const { t } = useTranslate();

  const headerCells = [
    '#',
    t(tKeys.youSend.getKey()),
    t(tKeys.youGet.getKey()),
    t(tKeys.expires.getKey()),
    '',
  ];

  const cellsAlign: Array<'left' | 'center' | 'right'> = ['center', 'left', 'left', 'left', 'right'];

  const { items: paginatedOrders, paginationView } = usePagination(orders);

  return !orders.length ? <span>Orders not found</span> : (
    <div>
      <Table separated className={classes.table}>
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
          {paginatedOrders.map((order, i) => {
            // tslint:disable:jsx-key
            const cells = [
              <Typography variant="body1" className={classes.memberNumber}>
                {i + 1}
              </Typography>,
              <Typography variant="body2">
                <ERC20Balance token={order.maker.token} amount={order.maker.param} />
              </Typography>,
              <Typography variant="body2">
                <ERC20Balance token={order.taker.token} amount={order.taker.param} />
              </Typography>,
              <Typography variant="body2">
                <Countdown
                  date={order.expiry * 1000}
                  renderer={expiredRenderer}
                />
              </Typography>,
              <TypographyA
                variant="body2"
                href={`https://trader${NETWORK_CONFIG.id === 1 ? '' : '.development'}.airswap.io/${order.cid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(tKeys.showMore.getKey())}
              </TypographyA>,
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
}

function mapState(state: IAppReduxState) {
  return {
    orders: selectors.selectTrades(state),
  };
}

export default connect(mapState)(provideStyles(OrdersList));
