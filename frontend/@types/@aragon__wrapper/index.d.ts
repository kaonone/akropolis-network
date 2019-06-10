// tslint:disable:max-classes-per-file
declare module '@aragon/wrapper' {
  import Web3 from 'web3';
  import { Provider, IAragonApp, IAragonPermissions, ITransactionBag, ITransaction } from '@aragon/types';
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

  interface IDecodedPathSegment {
    data: string;
    to: string;
  }

  export interface IDescribedPathSegment extends IDecodedPathSegment {
    data: string;
    to: string;
    description: string,
    annotatedDescription: IAnnotatedDescription[],
    name: string;
    identifier: string;
  }

  interface IAnnotatedDescription {
    type: 'any-account' | 'app' | 'address' | 'role' | 'apmPackage' | 'kernelNamespace' | 'bytes32' | 'text',
    value: string;
  }

  class AragonWrapper {
    public web3: Web3;
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

    public getTransactionPath(
      destination: string, methodName: string, params: string[], finalForwarder?: string,
    ): Promise<ITransaction[]>;

    public describeTransactionPath(segments: IDecodedPathSegment[]): Promise<IDescribedPathSegment[]>;

    public decodeTransactionPath(script: string): IDecodedPathSegment[];
  }

  export default AragonWrapper;
}

declare module '@aragon/wrapper/dist/core/proxy' {
  import Web3 from 'web3';
  import { EventLog, Contract } from 'web3/types';
  import { IAbi } from '@aragon/types';
  import { Observable } from 'rxjs';

  class ContractProxy {
    public constructor(address: string, jsonInterface: IAbi[], web3: Web3, initializationBlock?: number);
    public address: string;
    public initializationBlock: number;
    public contract: Contract;
    public call(method: string, ...params: string[]): Promise<any>;
    public updateInitializationBlock(): Promise<void>;
    public events(eventNames?: string[], options?: { fromBlock?: number }): Observable<EventLog>;
  }

  export default ContractProxy;
}

declare module '@aragon/wrapper/dist/utils' {
  import Web3 from 'web3';
  import { IAbi } from '@aragon/types';
  import ContractProxy from '@aragon/wrapper/dist/core/proxy';

  export function getRecommendedGasLimit(web3: Web3, estimatedGasLimit: number, options?: { gasFuzzFactor?: number }): number;
  export function makeProxyFromABI(address: string, abi: IAbi[], web3: Web3, initializationBlock?: number): ContractProxy;
}
