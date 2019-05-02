import { Provider } from 'shared/types/models';
import { IpfsConfig } from '@aragon/apm';

export interface IDaoApiConfig {
  aragonEnsRegistry: string;
  defaultWeb3Provider: Provider;
  walletWeb3Provider: Provider;
  ipfsConfig: IpfsConfig;
  defaultGasPriceFn(): string;
}

export type AppType = keyof IAppMethodParams;
export type MethodByApp<T extends AppType> = keyof IAppMethodParams[T];
export type ParamsByAppByMethod<T extends AppType, M extends MethodByApp<T>> = IAppMethodParams[T][M];

interface IAppMethodParams {
  'Token Manager': {
    mint: readonly [string, string]; // [holder, amount]
  };
  Voting: {
    mock: [];
  };
  Finance: {
    mock: [];
  };
}
