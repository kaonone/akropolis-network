import { AbiCoder } from 'web3-eth-abi';
import { BigNumber } from 'bignumber.js';
import { first } from 'rxjs/operators';
import AragonWrapper, { IDecodedPathSegment } from '@aragon/wrapper';

import { NETWORK_CONFIG } from 'core/constants';
import { ONE_ERC20 } from 'shared/constants';
import { VotingIntent } from 'shared/types/models';

import { AppType } from '../types';

export const EMPTY_CALLSCRIPT = '0x00000001';
export const ABI = new AbiCoder();

interface IGetIntentOptions {
  appProxyAddress: string;
  wrapper: AragonWrapper;
}

interface IConfig {
  paramsNames: string[];
  getIntent(params: Record<string, string>, options: IGetIntentOptions): Promise<VotingIntent> | VotingIntent;
}

export async function calculateVotingIntent(wrapper: AragonWrapper, voteScript?: string): Promise<VotingIntent> {
  const intentDetails: IDecodedPathSegment[] = !voteScript || voteScript === EMPTY_CALLSCRIPT
    ? []
    : wrapper.decodeTransactionPath(voteScript);

  if (!intentDetails[0]) {
    return { type: 'unknown' };
  }

  const details = intentDetails[0];
  const app = await wrapper.getApp(details.to);

  if (!app || !app.functions || !app.appName) {
    return { type: 'unknown' };
  }

  const appType: AppType = app.appName.split('.')[0] as AppType;

  const methodSigBytes = details.data.substring(0, 10);
  const methodDataBytes = `0x${details.data.substring(10)}`;
  const methodSig = app.functions.find(item => ABI.encodeFunctionSignature(item.sig) === methodSigBytes);

  if (!methodSig || !appType || !configByAppByMethod[appType][methodSig.sig]) {
    return { type: 'unknown' };
  }

  const config = configByAppByMethod[appType][methodSig.sig];
  const decodedParams = decodeParams(config.paramsNames, methodSig.sig, methodDataBytes);

  return config.getIntent(decodedParams, {
    appProxyAddress: app.proxyAddress,
    wrapper,
  });
}

const configByAppByMethod: Record<AppType, Record<string, IConfig>> = {
  'token-manager': {
    'mint(address,uint256)': {
      paramsNames: ['holder', 'amount'],
      getIntent: (params) => ({
        type: 'joinToDao',
        payload: {
          address: params.holder,
        },
      }),
    },
  },
  finance: {
    'newImmediatePayment(address,address,uint256,string)': {
      paramsNames: ['tokenAddress', 'recipient', 'amount', 'reason'],
      getIntent: async (params, { wrapper }): Promise<VotingIntent> => {
        const apps = await wrapper.apps.pipe(first()).toPromise();
        const vaultApp = apps.find(item => item.appName && item.appName.startsWith('vault'));

        if (!vaultApp) {
          return { type: 'unknown' };
        }

        return {
          type: 'transfer',
          payload: {
            amount: new BigNumber(params.amount).div(ONE_ERC20),
            from: vaultApp.proxyAddress,
            to: params.recipient,
            reason: params.reason,
          },
        };
      },
    },
  },
  agent: {
    'execute(address,uint256,bytes)': {
      paramsNames: ['address', 'ethAmount', 'data'],
      getIntent: getAgentIntent,
    },
  },
  voting: {},
  vault: {},
};

async function getAgentIntent(
  params: Record<'address' | 'ethAmount' | 'data', string>, options: IGetIntentOptions,
): Promise<VotingIntent> {
  const { wrapper, appProxyAddress } = options;

  const app = await wrapper.getApp(params.address);
  const executeTarget = app && app.appName
    ? app.appName.split('.')[0]
    : params.address;
  const methods = configByAragonExecuteTargetByMethod[executeTarget.toLowerCase()];

  if (!methods) {
    return { type: 'unknown' };
  }

  const methodSigBytes = params.data.substring(0, 10);
  const methodDataBytes = `0x${params.data.substring(10)}`;
  const methodSig = Object.keys(methods).find(item => ABI.encodeFunctionSignature(item) === methodSigBytes);

  if (!methodSig || !methods[methodSig]) {
    return { type: 'unknown' };
  }

  const config = methods[methodSig];
  const decodedParams = decodeParams(config.paramsNames, methodSig, methodDataBytes);

  return config.getIntent(decodedParams, {
    appProxyAddress,
    wrapper,
  });
}

const configByAragonExecuteTargetByMethod: Record<string, Record<string, IConfig>> = {
  [NETWORK_CONFIG.daiContract.toLowerCase()]: {
    'approve(address,uint256)': {
      paramsNames: ['address', 'amount'],
      getIntent: async (params, { wrapper }): Promise<VotingIntent> => {
        const app = await wrapper.getApp(params.address);

        const isZeroAmount = new BigNumber(params.amount).isEqualTo(0);
        const isFinanceApproving = app && app.appName && app.appName.startsWith('finance');

        if (isFinanceApproving) {
          return { type: isZeroAmount ? 'disableDeFiAccount' : 'enableDeFiAccount' };
        }

        return {
          type: isZeroAmount ? 'disableInvestment' : 'enableInvestment',
          payload: {
            address: params.address,
          },
        };
      },
    },
  },
  [NETWORK_CONFIG.investments.compound.toLowerCase()]: {
    'mint(uint256)': {
      paramsNames: ['amount'],
      getIntent: (params, { appProxyAddress }) => ({
        type: 'transfer',
        payload: {
          amount: new BigNumber(params.amount).div(ONE_ERC20),
          from: appProxyAddress,
          to: NETWORK_CONFIG.investments.compound,
        },
      }),
    },
    'redeemUnderlying(uint256)': {
      paramsNames: ['amount'],
      getIntent: (params, { appProxyAddress }) => ({
        type: 'transfer',
        payload: {
          amount: new BigNumber(params.amount).div(ONE_ERC20),
          from: NETWORK_CONFIG.investments.compound,
          to: appProxyAddress,
        },
      }),
    },
  },
  finance: {
    'deposit(address,uint256,string)': {
      paramsNames: ['tokenAddress', 'amount', 'reason'],
      getIntent: async (params, { appProxyAddress, wrapper }): Promise<VotingIntent> => {
        const apps = await wrapper.apps.pipe(first()).toPromise();
        const vaultApp = apps.find(item => item.appName && item.appName.startsWith('vault'));

        if (!vaultApp) {
          return { type: 'unknown' };
        }

        return {
          type: 'transfer',
          payload: {
            amount: new BigNumber(params.amount).div(ONE_ERC20),
            from: appProxyAddress,
            to: vaultApp.proxyAddress,
            reason: params.reason,
          },
        };
      },
    },
  },
};

function decodeParams(names: string[], signature: string, paramsHex: string): Record<string, string> {
  const types = signature.replace(')', '').split('(')[1];

  if (types === '') {
    return {};
  }

  const decoded = ABI.decodeParameters(types.split(','), paramsHex);

  return names.reduce<Record<string, string>>((acc, cur, index) => ({ ...acc, [cur]: decoded[index] }), {});
}
