import BN from 'bn.js';
import Web3 from 'web3';
import getApm, { ApmOptions } from '@aragon/apm';
import { getRecommendedGasLimit } from '@aragon/wrapper/dist/utils';
import { Contract, TransactionObject } from 'web3/types';

export interface IBuilderOptions {
  apmOptions: ApmOptions;
  web3: Web3;
  defaultGasPriceFn(gas: number): string | Promise<string>;
}

export interface IGasOptions {
  gas: number;
  gasPrice: string;
}

export type TokenParams = Readonly<[string, string]>; // [tokenName, tokenSymbol]

// [domainName, accounts, stakes, supportNeeded, minAcceptanceQuorum, voteDuration]
export type InstanceParams = Readonly<[string, string[], BN[], BN, BN, number]>;

export interface IParamsWithGasOptions<P> {
  params: P;
  options?: Partial<IGasOptions>;
}

export const getBuilder = (from: string, { apmOptions, defaultGasPriceFn, web3 }: IBuilderOptions) => {
  const apm = getApm(web3, apmOptions);

  const newToken = async (template: Contract, { params, options = {} }: IParamsWithGasOptions<TokenParams>) => {
    const [tokenName, tokenSymbol] = params;
    const call = template.methods.newToken(tokenName, tokenSymbol);
    const receipt = await call.send({
      from,
      ...await applyCallGasOptions(call, options),
    });
    return receipt.events.DeployToken.returnValues;
  };

  const newInstance = async (template: Contract, { params, options = {} }: IParamsWithGasOptions<InstanceParams>) => {
    const call = template.methods.newInstance(...params);
    const receipt = await call.send({
      from,
      ...await applyCallGasOptions(call, options),
    });
    return receipt.events.DeployInstance.returnValues;
  };

  const applyCallGasOptions = async (
    call: TransactionObject<any>,
    txOptions: Partial<IGasOptions>,
  ): Promise<IGasOptions> => {
    async function getGas() {
      const estimatedGasLimit = await call.estimateGas({ from });
      return getRecommendedGasLimit(web3, estimatedGasLimit, { gasFuzzFactor: 1.1 });
    }
    const gas = txOptions.gas || await getGas();
    const gasPrice = txOptions.gasPrice || await defaultGasPriceFn(gas);
    return { gas, gasPrice };
  };

  const newDAO = async (
    templateEnsId: string,
    tokenParams: IParamsWithGasOptions<TokenParams>,
    instanceParams: IParamsWithGasOptions<InstanceParams>,
  ): Promise<[string, string]> => {
    const { contractAddress, abi } = await apm.getLatestVersion(templateEnsId);
    if (!contractAddress) {
      throw new Error(`No contract found on APM for template '${templateEnsId}'`);
    }
    if (!abi) {
      throw new Error(`Could not fetch ABI for template '${templateEnsId}'`);
    }
    const template = new web3.eth.Contract(abi, contractAddress);
    const token = await newToken(template, tokenParams);
    const instance = await newInstance(template, instanceParams);
    return [token, instance];
  };

  return { newDAO };
};
