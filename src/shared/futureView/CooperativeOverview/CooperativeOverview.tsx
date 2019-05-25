import * as React from 'react';

import { Grid } from 'shared/view/elements';

import { CooperativeChart, CooperativeGoal, PersonalInformation } from './components';

import { StylesProps, provideStyles } from './CooperativeOverview.style';

// tslint:disable-next-line:max-line-length
const mockGoalDescription = 'This group is for friends-of-friends, to help all members with unforeseen problems. Let’s hit our goal in 6 months, then set a higher bar!';

const CooperativeOverview = (props: StylesProps) => {
  const { classes } = props;
  return (
    <Grid container wrap="nowrap" justify="space-between" className={classes.root} spacing={32} alignItems="stretch" >
      <Grid item xs={4} >
        <div className={classes.section}>
          <CooperativeChart membersCount={8} balance={2192.22} balanceChange={12.81} />

        </div>
      </Grid>
      <Grid item xs={4} >
        <div className={classes.section}>

          <CooperativeGoal totalGoal={12000} current={5670} description={mockGoalDescription} />
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.section}>
          <PersonalInformation />
        </div>
      </Grid>
    </Grid>
  );
};

export default React.memo(provideStyles(CooperativeOverview));
