import { observable, action, runInAction, when } from 'mobx';
import AragonWrapper, { ensResolve } from '@aragon/wrapper';
import { IAragonApp, ITransaction } from '@aragon/types';

import getEnvParams from 'core/getEnvParams';
import { getWeb3, getMainAccount } from 'shared/helpers/web3';
import { NULL_ADDRESS } from 'shared/constants';
import { IDaoApiConfig, AppType, MethodByApp, ParamsByAppByMethod } from './types';

export class BaseDaoApi {
  @observable
  private wrapper: AragonWrapper | null = null;
  @observable
  private apps: IAragonApp[] = [];

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

    const daoAddress = await ensResolve(`${daoEnsName}.aragonid.eth`, {
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

  public async sendTransaction<T extends AppType, M extends MethodByApp<T>, P extends ParamsByAppByMethod<T, M>>(
    appType: T, method: M, params: P,
  ) {
    if (!this.wrapper) {
      throw new Error('AragonWrapper is not initialized');
    }

    const proxyAddress = getAppAddressByName(appType, this.apps);

    const path = await this.wrapper.getTransactionPath(proxyAddress, method as string, params as any);

    if (!getEnvParams().isProduction && path.length > 1) {
      const msg = 'Transactions path have more than one transaction, see developer console for more info';
      window.alert(msg);
      console.error(new Error(msg));
      console.log('This path have more than one transaction', { path });
    }

    return path[0] && this._sendTransaction(path[0]);
  }

  private async _sendTransaction(transaction: ITransaction) {
    if (!getEnvParams().isProduction && transaction.pretransaction) {
      const msg = 'Need to sign pretransaction, see developer console for more info';
      window.alert(msg);
      console.error(new Error(msg));
      console.log('This transaction contains pretransaction', { transaction });
    }

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
    this.apps = apps; // 'this' will always be correct
  }
}

function getAppAddressByName(appName: string, apps: IAragonApp[]): string {
  const foundApp = apps.find(app => app.name.toLowerCase() === appName.toLowerCase());
  return (foundApp || { proxyAddress: NULL_ADDRESS }).proxyAddress;
}
