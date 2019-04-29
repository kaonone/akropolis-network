// tslint:disable:max-classes-per-file
declare module '@aragon/wrapper' {
  import { Provider, IAragonApp, IAragonPermissions, ITransactionBag } from '@aragon/types';
  import { ApmOptions } from '@aragon/apm';
  import { Observable, Subscription } from 'rxjs';

  class WrapperProvider { }
  class MessagePortMessageProvider extends WrapperProvider {
    constructor(worker: Worker);
  }
  class WindowMessageProvider extends WrapperProvider {
    constructor(frameContentWindow: HTMLFrameElement['contentWindow']);
  }

  export const providers: {
    MessagePortMessage: typeof MessagePortMessageProvider;
    WindowMessage: typeof WindowMessageProvider;
  };

  interface ITemplate {

  }
  export function setupTemplates(account: string, options: IAragonWrapperOptions): ITemplate;

  interface IEnsResolveOptions {
    provider: Provider;
    registryAddress: string;
  }
  export function isNameUsed(name: string, options: IEnsResolveOptions): Promise<boolean>;
  export function ensResolve(domain: string, options: IEnsResolveOptions): Promise<string>;

  interface IAragonWrapperOptions {
    provider: Provider;
    apm: ApmOptions;
    defaultGasPriceFn(): string | undefined;
  }

  class AragonWrapper {
    public apps: Observable<IAragonApp[]>;
    public permissions: Observable<IAragonPermissions>;
    public forwarders: Observable<IAragonApp[]>;
    public transactions: Observable<ITransactionBag>;

    constructor(daoAddress: string, options: IAragonWrapperOptions)

    public connectAppIFrame(iframeElt: HTMLIFrameElement, proxyAddress: string): { shutdown: Subscription };
    public cancel(): void;
    public setAccounts(accounts: string[]): void;

    public runApp(provider: MessagePortMessageProvider, proxyAddress: string): { shutdown: Subscription };
    public init(options: {
      accounts: {
        providedAccounts: string[];
      };
    }): Promise<void>;
  }

  export default AragonWrapper;
}

declare module '@aragon/wrapper/dist/utils' {
  import Web3 from 'web3';

  export function getRecommendedGasLimit(web3: Web3, estimatedGasLimit: number, options?: { gasFuzzFactor?: number }): number;
}
