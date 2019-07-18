import { Store } from 'redux';
import { Drizzle, generateStore, IDrizzleOptions } from 'drizzle';

import Api from 'services/api/Api';
import { DaoApi } from 'services/daoApi';
import { LocalStorage } from 'services/storage';
import { IDependencies, IAppReduxState } from 'shared/types/app';

import { NETWORK_CONFIG, contracts, web3Providers, defaultGasPriceFn } from './constants';

export default function configureDeps(_store: Store<IAppReduxState>): IDependencies {
  const api = new Api('/api');

  const options: IDrizzleOptions = { contracts };
  const drizzleStore = generateStore(options);
  const drizzle = new Drizzle(options, drizzleStore);
  const storage = new LocalStorage('v1');

  DaoApi.setConfig({
    aragonEnsRegistry: NETWORK_CONFIG.aragonEnsRegistry,
    defaultGasPriceFn,
    defaultWeb3Provider: web3Providers.default,
    walletWeb3Provider: web3Providers.wallet,
    ipfsConfig: NETWORK_CONFIG.defaultIpfsConfig,
  });

  return {
    api,
    drizzle,
    storage,
  };
}
