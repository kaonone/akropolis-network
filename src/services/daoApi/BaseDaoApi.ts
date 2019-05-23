import { observable, action, runInAction, when } from 'mobx';
import AragonWrapper, { ensResolve } from '@aragon/wrapper';
import ContractProxy from '@aragon/wrapper/dist/core/proxy';
import { makeProxyFromABI } from '@aragon/wrapper/dist/utils';
import { IAragonApp, ITransaction } from '@aragon/types';

import { getWeb3, getMainAccount } from 'shared/helpers/web3';
import { notifyDevWarning } from 'shared/helpers/notifyDevWarning';
import { isEthereumAddress } from 'shared/validators/isEthereumAddress/isEthereumAddress';
import { NULL_ADDRESS } from 'shared/constants';
import { IDaoApiConfig, AppType, MethodByApp, ParamsByAppByMethod } from './types';

interface IExtendedAragonApp extends IAragonApp {
  proxy: ContractProxy;
}

export class BaseDaoApi {
  @observable
  private wrapper: AragonWrapper | null = null;
  @observable
  private apps: IExtendedAragonApp[] = [];

  private config: IDaoApiConfig;

  constructor(config: IDaoApiConfig) {
    this.config = config;
  }

  public get web3() {
    return getWeb3(this.config.walletWeb3Provider);
  }

  public async getAccount() {
    return getMainAccount(this.web3);
  }

  public async setDao(daoEnsName: string) {
    const { aragonEnsRegistry, defaultGasPriceFn, defaultWeb3Provider, ipfsConfig } = this.config;
    this.wrapper && this.wrapper.cancel();

    runInAction(() => {
      this.apps = [];
      this.wrapper = null;
    });

    const daoAddress = isEthereumAddress(daoEnsName) ? daoEnsName : await ensResolve(`${daoEnsName}.aragonid.eth`, {
      provider: defaultWeb3Provider,
      registryAddress: aragonEnsRegistry,
    });

    if (!daoAddress) {
      throw new Error('Dao address is not found');
    }

    const wrapper = new AragonWrapper(daoAddress, {
      provider: defaultWeb3Provider,
      defaultGasPriceFn,
      apm: {
        ensRegistryAddress: aragonEnsRegistry,
        ipfs: ipfsConfig,
      },
    });

    const account = await this.getAccount();

    await wrapper.init({
      accounts: {
        providedAccounts: account ? [account] : [],
      },
    });

    const subscriptions = {
      apps: wrapper.apps.subscribe(this.setApps),
    };

    wrapper.cancel = () => {
      Object.values(subscriptions).forEach(subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    };

    await when(() => !!this.apps.length);

    this.wrapper = wrapper;
  }

  public async call<T extends AppType, M extends MethodByApp<T>, P extends ParamsByAppByMethod<T, M>>(
    appType: T, method: M, params: P,
  ) {
    if (!this.wrapper) {
      throw new Error('AragonWrapper is not initialized');
    }

    const app = getAppByName(appType, this.apps);

    if (!app) {
      throw new Error(`app for "${appType}" is not found`);
    }

    return app.proxy.call(method as any, ...(params as any || []));
  }

  public async sendTransaction<T extends AppType, M extends MethodByApp<T>, P extends ParamsByAppByMethod<T, M>>(
    appType: T, method: M, params: P,
  ) {
    if (!this.wrapper) {
      throw new Error('AragonWrapper is not initialized');
    }

    const proxy = getAppByName(appType, this.apps);
    const proxyAddress = proxy ? proxy.proxyAddress : NULL_ADDRESS;

    const path = await this.wrapper.getTransactionPath(proxyAddress, method as string, params as any);

    notifyDevWarning(
      path.length > 1,
      'Transactions path have more than one transaction',
      { path },
    );

    return path[0] && this._sendTransaction(path[0]);
  }

  private async _sendTransaction(transaction: ITransaction) {
    notifyDevWarning(
      !!transaction.pretransaction,
      'Transaction have pretransaction, check code that sign this pretransaction',
      { transaction },
    );

    return new Promise<string>((resolve, reject) => {
      this.web3.eth
        .sendTransaction(transaction)
        .on('transactionHash', transactionHash => {
          // resolve(transactionHash);
          console.log(transactionHash);
        })
        .on('receipt', receipt => {
          if (receipt.status === '0x0') {
            // Failure based on EIP 658
            // setActivityFailed(receipt.transactionHash);
            reject('Failure based on EIP 658');
          } else {
            resolve(receipt.transactionHash);
            // setActivityConfirmed(receipt.transactionHash);
          }
        })
        .on('error', (err: any) => {
          // Called when signing failed
          // err && err.transactionHash && setActivityFailed(err.transactionHash);
          reject(err);
        });
    });
  }

  @action.bound
  private setApps(apps: IAragonApp[]) {
    this.apps = apps.map(app => ({
      ...app,
      proxy: makeProxyFromABI(app.proxyAddress, app.abi, this.web3),
    }));
}
}

function getAppByName(appName: string, apps: IExtendedAragonApp[]): IExtendedAragonApp | null {
  return apps.find(app => app.name.toLowerCase() === appName.toLowerCase()) || null;
}
