import * as React from 'react';
import { useObserver } from 'mobx-react-lite';
import BigNumber from 'bignumber.js';

import { useDaoApi } from 'services/daoApi';

import { InvestmentType, FutureInvestmentType, IInvestmentState, IInvestmentApi } from 'shared/types/models';
import { ProductCard } from 'shared/futureView/ProductCard/ProductCard';
import { Grid } from 'shared/view/elements';

import { StylesProps, provideStyles } from './Products.style';
import DeFiAccount from './DeFiAccount/DeFiAccount';

const types: InvestmentType[] = ['compound'];
const futureTypes: FutureInvestmentType[] = ['set', 'dharma', 'uma', 'melonport'];

const emptyState: IInvestmentState = {
  balance: new BigNumber(0),
  currentRate: new BigNumber(0),
  earned: new BigNumber(0),
  isEnabled: false,
};

const emptyApi: IInvestmentApi = {
  isEnabled: () => Promise.resolve(false),
  getBalance: () => Promise.resolve(new BigNumber(0)),
  getEarn: () => Promise.resolve(new BigNumber(0)),
  getCurrentRate: () => Promise.resolve(new BigNumber(0)),
  enable: () => Promise.resolve(),
  deposit: () => Promise.resolve(),
  withdraw: () => Promise.resolve(),
};

type IProps = StylesProps;

function Products(props: IProps) {
  const { classes } = props;

  const daoApi = useDaoApi();
  const isEnabledDeFi = useObserver(() => daoApi.store.agent.isEnabled);
  const investments = useObserver(() => daoApi.store.agent.investments);

  return (
    <div className={classes.root}>
      <Grid container spacing={32} alignItems="stretch">
        <Grid item xs={12}>
          <DeFiAccount />
        </Grid>
        {types.map((type, i) => (
          <Grid key={i} item xs={6}>
            <ProductCard
              disabled={!isEnabledDeFi}
              type={type}
              state={investments[type]}
              api={daoApi.investments[type]}
            />
          </Grid>
        ))}
        {futureTypes.map((type, i) => (
          <Grid key={i} item xs={6}>
            <ProductCard
              isComingSoon
              type={type}
              state={emptyState}
              api={emptyApi}
            />
          </Grid>
        ))}
      </Grid>
    </div>);
}

export default provideStyles(Products);
