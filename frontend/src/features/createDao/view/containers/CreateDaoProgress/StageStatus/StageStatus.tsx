import * as React from 'react';
import cn from 'classnames';

import { useTranslate, tKeys } from 'services/i18n';
import { Grid, Typography, CircleProgressBar } from 'shared/view/elements';
import { Checked } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './StageStatus.style';

interface IProps {
  title: string;
  isDone: boolean;
}

function StageStatus(props: IProps & StylesProps) {
  const { classes, title, isDone } = props;
  const { t } = useTranslate();
  return (
    <Grid container spacing={16} direction="column" alignItems="center">
      <Grid item>
        <Typography variant="body2" className={!isDone ? classes.gray : void 0}>{title}</Typography>
      </Grid>
      <Grid item>
        {isDone
          ? <Checked className={cn(classes.icon, classes.positive)} />
          : <CircleProgressBar size={40} />
        }
      </Grid>
      <Grid item>
        <Typography variant="overline" className={isDone ? classes.positive : classes.waiting}>
          {t(isDone
            ? tKeys.shared.done.getKey()
            : tKeys.shared.waiting.getKey(),
          )}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default provideStyles(StageStatus);
