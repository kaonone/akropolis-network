import * as React from 'react';
import * as cn from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

import { formatPercent, formatDAI } from 'shared/helpers/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import Typography from '../Typography/Typography';
import { StylesProps, provideStyles } from './ProgressBar.style';

const tKeys = tKeysAll.shared;
interface IOwnProps {
  variant?: 'primary' | 'secondary';
  totalValue: number;
  currentValue: number;
  className?: string;
}

type IProps = IOwnProps & StylesProps;

function ProgressBar(props: IProps) {
  const { classes, totalValue, currentValue, className, variant } = props;
  const relativeValue = currentValue / totalValue * 100;
  const { t } = useTranslate();
  return (
    <div
      className={cn(classes.root, className, {
        [classes.primary]: !variant || variant === 'primary',
        [classes.secondary]: variant === 'secondary',
      })}
    >
      <CircularProgress
        className={classes.borderOverlay}
        classes={{ circle: classes.circle }}
        variant="static"
        size={'100%'}
        value={100}
      />
      <CircularProgress
        className={classes.overlay}
        classes={{ circle: classes.circle }}
        variant="static"
        size={variant === 'secondary' ? '98%' : '82%'}
        value={100}
      />
      <CircularProgress
        className={classes.progress}
        classes={{ circle: classes.progressCircle }}
        variant="static"
        value={relativeValue}
        size={variant === 'secondary' ? '94%' : '100%'}
      />
      <div className={classes.values}>
        <Typography
          variant={variant === 'secondary' ? 'h4' : 'subtitle1'}
          weight="medium"
          className={classes.percent}
        >
          {formatPercent(relativeValue, 0)}
        </Typography>
        {variant === 'secondary' && <Typography variant="body2" className={classes.goal}>
          {`${t(tKeys.dao.goal.getKey())}: ${formatDAI(totalValue)}`}
        </Typography>}
      </div>
    </div>
  );
}

export default provideStyles(ProgressBar);
