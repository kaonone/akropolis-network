import * as React from 'react';
import { useObserver } from 'mobx-react-lite';
import BigNumber from 'bignumber.js';

import { useDaoApi } from 'services/daoApi';

import { InvestmentType, FutureInvestmentType, IInvestmentState, IInvestmentApi } from 'shared/types/models';
import { ProductCard } from 'shared/futureView/ProductCard/ProductCard';
import { Grid } from 'shared/view/elements';

import { StylesProps, provideStyles } from './Products.style';

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

  const deFiBalance = useObserver(() => daoApi.store.agent.availableBalance);

  const products = types.map(type => ({
    type,
    state: useObserver(() => daoApi.store.agent.investments[type]),
    api: daoApi.investments[type],
  }));

  return (
    <div className={classes.root}>
      <Grid container spacing={32} alignItems="stretch">
        <Grid item xs={12}>
          DeFi products state. Balance: {deFiBalance.toFixed(2)} DAI
        </Grid>
        {products.map((product, i) => (
          <Grid key={i} item xs={6}>
            <ProductCard
              {...product}
            />
          </Grid>
        ))}
        {futureTypes.map((type, i) => (
          <Grid key={i} item xs={6}>
            <ProductCard
              disabled
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
