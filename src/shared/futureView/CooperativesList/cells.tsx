import * as React from 'react';

import { StylesProps, provideStyles } from './CooperativesList.style';
import NewEvent from 'shared/view/elements/Icons/NewEvent';

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
      alignItems="flex-end"
      direction={'column'}
    >
      <Typography variant="subtitle1" className={classes.complexCellTitle}>{title}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Grid>
  );

}));

const EventCell = React.memo(provideStyles((props: StylesProps) => {

  const { classes } = props;

  return <NewEvent className={classes.eventIcon} />;

  // return (
  //   <>
  //     {event === 'new' &&
  //       <Typography variant="caption" className={classes.newEvent}>{
  //         t(tKeys.shared.new.getKey())}
  //         <NewEvent className={classes.eventIcon} />
  //       </Typography>}
  //     {event === 'reviewed' && <NewEvent className={classes.eventIcon} />}
  //   </>
  // );

}));

export { ComplexCell, EventCell };
