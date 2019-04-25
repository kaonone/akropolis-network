
// tslint:disable:max-classes-per-file
declare module '@aragon/wrapper' {
  import { Provider, IAragonApp, IAragonPermissions, ITransactionBag } from '@aragon/types';
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
  export function setupTemplates(): void;

  interface IEnsResolveOptions {
    provider: Provider;
    registryAddress: string;
  }
  export function isNameUsed(name: string, options: IEnsResolveOptions): Promise<boolean>;
  export function ensResolve(domain: string, options: IEnsResolveOptions): Promise<string>;

  export interface IpfsConfig {
    gateway: string;
  }

  interface IAragonWrapperOptions {
    provider: Provider;
    apm: {
      ensRegistryAddress: string;
      ipfs: IpfsConfig;
    };
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
