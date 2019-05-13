import * as React from 'react';

import { StylesProps, provideStyles } from './CooperativesList.style';
import { CooperativeEvent } from 'shared/types/models/Cooperative';
import NewEvent from 'shared/view/elements/Icons/NewEvent';

import { useTranslate, tKeys } from 'services/i18n';
import { Typography, Grid } from 'shared/view/elements';

interface IComplexCellProps {
  title: string;
  value: string | number;
}

const ComplexCell = React.memo(provideStyles((props: IComplexCellProps & StylesProps) => {

  const { classes, title, value } = props;
  return (
    <Grid
      container
      className={classes.complexCell}
      alignItems="flex-end"
      direction={'column'}
    >
      <Typography variant="subtitle1" className={classes.complexCellTitle}>{title}</Typography>
      <Typography variant="body1" className={classes.complexCellValue}>{value}</Typography>
    </Grid>
  );

}));

interface IEventCellProps {
  event?: CooperativeEvent;
}

const EventCell = React.memo(provideStyles((props: IEventCellProps & StylesProps) => {

  const { classes, event } = props;
  const { t } = useTranslate();
  return (
    <>
      {event === 'new' &&
        <Typography variant="caption" className={classes.newEvent}>{
          t(tKeys.shared.new.getKey())}
          <NewEvent className={classes.eventIcon} />
        </Typography>}
      {event === 'reviewed' && <NewEvent className={classes.eventIcon} />}

    </>
  );

}));

export { ComplexCell, EventCell };
