import BN from 'bn.js';
import { Provider } from 'shared/types/models';
import { web3Providers, NETWORK_CONFIG, TEMPLATE_ENS_ID, defaultGasPriceFn } from 'core/constants';
import { getWeb3, getMainAccount } from 'shared/helpers/web3';
import { getBuilder, InstanceParams } from './getBuilder';

const percentageBase = new BN(10).pow(new BN(16));

// DEV only
// provider = new Web3.providers.WebsocketProvider('ws://localhost:8546')
const provider: Provider = web3Providers.wallet;
const ensRegistryAddress: string = NETWORK_CONFIG.aragonEnsRegistry;
const ipfsConf = NETWORK_CONFIG.defaultIpfsConfig;

export const buildDao = async (domainName: string) => {
  if (!domainName) {
    throw new Error('No co-op name set');
  }

  const tokenName = `${domainName} token`;
  const tokenSymbol = `${domainName.slice(0, 2)}CT`;
  const minAcceptanceQuorum = percentageBase.muln(15);
  const supportNeeded = percentageBase.muln(50);
  const voteDuration = 24 * 60 * 60;

  const web3 = getWeb3(provider);
  const account = await getMainAccount(web3);

  if (account === null) {
    throw new Error('No accounts detected in the environment (try to unlock your wallet)');
  }

  const apmOptions = { ensRegistryAddress, ipfs: ipfsConf };
  const builder = getBuilder(account, { apmOptions, defaultGasPriceFn, web3 });

  const tokenParams = [tokenName, tokenSymbol] as const;
  const templateInstanceParams = getTemplateInstanceParams(
    { domainName, minAcceptanceQuorum, supportNeeded, voteDuration },
    account,
  );

  return builder.newDAO(
    TEMPLATE_ENS_ID,
    { params: tokenParams },
    { params: templateInstanceParams },
  );
};

const getTemplateInstanceParams = (
  // domainName: String of co-op name
  // supportNeeded: BN between 0 (0%) and 1e18 - 1 (99.99...%).
  // minAcceptanceQuorum: BN between 0 (0%) and 1e18 - 1(99.99...%).
  // voteDuration: Duration in seconds.
  params: { domainName: string, supportNeeded: BN, minAcceptanceQuorum: BN, voteDuration: number },
  account: string,
): InstanceParams => {
  const { domainName, supportNeeded, minAcceptanceQuorum, voteDuration } = params;
  const percentageMax = new BN(10).pow(new BN(18));
  if (
    supportNeeded.gte(percentageMax) ||
    minAcceptanceQuorum.gte(percentageMax)
  ) {
    throw new Error(
      `supported needed ${supportNeeded.toString()} and minimum acceptance` +
      `quorum (${minAcceptanceQuorum.toString()}) must be below 100%`,
    );
  }

  const tokenBase = new BN(10).pow(new BN(18));
  const holders = [{ address: account, balance: 1 }];

  const [accounts, stakes] = holders.reduce<[string[], BN[]]>(
    ([accAccounts, accStakes], holder) => [
      [...accAccounts, holder.address],
      [...accStakes, tokenBase.muln(holder.balance)],
    ],
    [[], []],
  );

  return [
    domainName,
    accounts,
    stakes,
    supportNeeded,
    minAcceptanceQuorum,
    voteDuration,
  ];
};
