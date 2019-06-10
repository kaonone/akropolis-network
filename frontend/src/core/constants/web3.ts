import Web3 from 'web3';
import provider from 'eth-provider';

import { getInjectedProvider, getCurrentProviderType } from 'shared/helpers/web3';
import { NETWORK_CONFIG } from './network';

export const web3Providers = {
  default: new Web3.providers.WebsocketProvider(NETWORK_CONFIG.defaultEthNode),
  // Only use eth-provider to connect to frame if no injected provider is detected
  wallet: getInjectedProvider() || provider(['frame']),
  walletProviderType: getCurrentProviderType(),
};
