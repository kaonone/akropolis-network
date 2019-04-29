
import { isNameUsed as isNameUsedOriginal } from '@aragon/wrapper';
import { NETWORK_CONFIG, web3Providers } from 'core/constants';

export const isNameUsed = async (name: string) => isNameUsedOriginal(name, {
  provider: web3Providers.default,
  registryAddress: NETWORK_CONFIG.aragonEnsRegistry,
});
