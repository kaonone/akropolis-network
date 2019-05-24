import { Provider } from 'shared/types/models';
import { IpfsConfig } from '@aragon/apm';

export interface IDaoApiConfig {
  aragonEnsRegistry: string;
  defaultWeb3Provider: Provider;
  walletWeb3Provider: Provider;
  ipfsConfig: IpfsConfig;
  defaultGasPriceFn(): string;
}

export interface ITransitionPeriod {
  isCurrent: boolean;
  startTime: string; // at seconds
  endTime: string; // at seconds
  firstTransactionId: string;
  lastTransactionId: string;
}

export type AppType = keyof IAppMethodParams;
export type MethodByApp<T extends AppType> = keyof IAppMethodParams[T];
export type ParamsByAppByMethod<T extends AppType, M extends MethodByApp<T>> = IAppMethodParams[T][M];

interface IAppMethodParams {
  'Token Manager': {
    // set
    mint: readonly [string, string]; // [holder, amount]
    // get
    maxAccountTokens: null;
    token: null;
  };
  Voting: {
    mock: [];
  };
  Finance: {
    // set
    newImmediatePayment: readonly [string, string, string, string]; // [tokenAddress, recipient, amount, reference]
    deposit: readonly [string, string, string, object]; // [tokenAddress, amount, reference, intentParams]
    // get
    getPeriodDuration: null;
    currentPeriodId: null;
    getPeriod: readonly [string]; // [periodId]
  };
}
