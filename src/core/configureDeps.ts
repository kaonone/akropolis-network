import { Store } from 'redux';
import { Drizzle, generateStore, IDrizzleOptions } from 'drizzle';

import { RPCSubprovider, Web3ProviderEngine, ContractWrappers } from '0x.js';
import { HttpClient } from '@0x/connect';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { MetamaskSubprovider } from '@0x/subproviders';

import Api from 'services/api/Api';
import { DaoApi } from 'services/daoApi';
import { LocalStorage } from 'services/storage';
import { IDependencies, IAppReduxState } from 'shared/types/app';

import { NETWORK_CONFIG, RELAYER_URL, contracts, web3Providers, defaultGasPriceFn } from './constants';

export default function configureDeps(_store: Store<IAppReduxState>): IDependencies {
  const api = new Api('/api');

  const options: IDrizzleOptions = { contracts };
  const drizzleStore = generateStore(options);
  const drizzle = new Drizzle(options, drizzleStore);
  const storage = new LocalStorage('v1');

  const providerEngine = new Web3ProviderEngine();
  if ((window as any).web3 && (window as any).web3.currentProvider) {
    providerEngine.addProvider(new MetamaskSubprovider((window as any).web3.currentProvider));
  }
  providerEngine.addProvider(new RPCSubprovider(NETWORK_CONFIG.rpcUrl));
  providerEngine.start();

  const web3Wrapper = new Web3Wrapper(providerEngine);
  const contractWrappers = new ContractWrappers(providerEngine, { networkId: NETWORK_CONFIG.id });
  const client0x = new HttpClient(RELAYER_URL);

  const daoApi = new DaoApi({
    aragonEnsRegistry: NETWORK_CONFIG.aragonEnsRegistry,
    defaultGasPriceFn,
    defaultWeb3Provider: web3Providers.default,
    walletWeb3Provider: web3Providers.wallet,
    ipfsConfig: NETWORK_CONFIG.defaultIpfsConfig,
  });

  return {
    api,
    daoApi,
    drizzle,
    storage,
    Ox: {
      providerEngine,
      client: client0x,
      contractWrappers,
      web3Wrapper,
    },
  };
}
