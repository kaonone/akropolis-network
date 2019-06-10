import * as React from 'react';
import * as cn from 'classnames';
import * as R from 'ramda';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Grid, IconButton, Typography, Select, MenuItem } from 'shared/view/elements';
import { AngleArrow } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './Pagination.style';

const tKeys = tKeysAll.shared.pagination;

interface IProps {
  currentPage: number;
  totalItems: number;
  perPage: number;
  paginationSteps: number[];
  onChangePerPage(itemsPerPage: number): void;
  onChangePage(currentPage: number): void;
}

function Pagination(props: IProps & StylesProps) {
  const { classes, onChangePerPage, perPage, currentPage, totalItems, onChangePage, paginationSteps } = props;
  const { t } = useTranslate();

  const from = currentPage * perPage;
  const to = R.clamp(0, totalItems, from + perPage);

  const isDisabledDecrease = from <= 0;
  const isDisabledIncrease = to >= totalItems;

  const handleChangePerPage = React.useCallback((event) => onChangePerPage(event.target.value), [onChangePerPage]);

  return (
    <div className={classes.root}>

      <Grid container wrap="nowrap" justify="flex-end" alignItems="center" spacing={40}>
        <Grid item>
          <Typography component="span" className={classes.itemsPerPage} variant="subtitle1">
            {`${t(tKeys.itemsPerPage.getKey())}:`}
          </Typography>
          <Select
            value={perPage}
            onChange={handleChangePerPage}
            classes={{ select: classes.select }}
          >
            {paginationSteps.map(step => (<MenuItem key={step} value={step}>{step}</MenuItem>))}
          </Select>
        </Grid>
        <Grid item>
          <Typography className={classes.currentItems} variant="subtitle1">
            {t(tKeys.currentPagination.getKey(), { from: from + 1, to, total: totalItems })}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container wrap="nowrap" justify="space-between">
            <IconButton
              className={classes.toggleBack}
              onClick={onChangePage.bind(null, currentPage - 1)}
              disabled={isDisabledDecrease}
            >
              <AngleArrow className={cn(classes.toggleIcon, { [classes.disabled]: isDisabledDecrease })} />
            </IconButton>
            <IconButton
              onClick={onChangePage.bind(null, currentPage + 1)}
              disabled={to >= totalItems}
            >
              <AngleArrow className={cn(classes.toggleIcon, { [classes.disabled]: isDisabledIncrease })} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </div>

  );
}

export default React.memo(provideStyles(Pagination));
