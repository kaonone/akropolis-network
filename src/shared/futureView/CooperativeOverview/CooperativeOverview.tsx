import * as React from 'react';
import { useObserver } from 'mobx-react-lite';

import { useAccountAddress } from 'services/user';
import { useDaoApi } from 'services/daoApi';
import { Grid } from 'shared/view/elements';

import { CooperativeChart, CooperativeGoal, PersonalInformation } from './components';

import { StylesProps, provideStyles } from './CooperativeOverview.style';

// tslint:disable-next-line:max-line-length
const mockGoalDescription = 'This group is for friends-of-friends, to help all members with unforeseen problems. Let’s hit our goal in 6 months, then set a higher bar!';

const CooperativeOverview = (props: StylesProps) => {
  const { classes } = props;
  const daoApi = useDaoApi();

  const userAccountAddress = useAccountAddress();

  const cooperativeBalance = useObserver(() => daoApi.store.finance.daoOverview.balance.value);
  const cooperativeBalanceChange = useObserver(() => daoApi.store.finance.daoOverview.balance.change);

  const cooperativeHolders = useObserver(() => daoApi.store.tokenManager.holders);
  const financeHolders = useObserver(() => daoApi.store.finance.holders);

  const holdersCount = Object.values(cooperativeHolders).length;

  const userAccount = cooperativeHolders[userAccountAddress];
  const userBalance = (financeHolders[userAccountAddress] || { balance: 0 }).balance;

  return (
    <Grid container wrap="nowrap" className={classes.root} spacing={32} alignItems="stretch" >
      <Grid item xs={4} >
        <div className={classes.section}>
          <CooperativeChart
            membersCount={holdersCount}
            balance={cooperativeBalance}
            balanceChange={cooperativeBalanceChange}
          />
        </div>
      </Grid>
      <Grid item xs={4} >
        <div className={classes.section}>
          <CooperativeGoal totalGoal={12000} current={5670} description={mockGoalDescription} />
        </div>
      </Grid>
      {userAccount &&
        <Grid item xs={4}>
          <div className={classes.section}>
            <PersonalInformation earn={0} deposit={userBalance} />
          </div>
        </Grid>}
    </Grid>
  );
};

export default React.memo(provideStyles(CooperativeOverview));
