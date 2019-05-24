import { bind } from 'decko';
import { ONE_ERC20 } from 'shared/constants';
import { IDaoApiConfig } from './types';
import { BaseDaoApi } from './BaseDaoApi';
import { DaoStore } from './store';

export class DaoApi {
  public static setConfig(config: IDaoApiConfig) {
    this.config = config;
  }

  public static async getDaoApiOrCreate(daoEnsName: string) {
    return DaoApi.daos.get(daoEnsName) || DaoApi.createDaoApi(daoEnsName);
  }

  private static daos = new Map<string, DaoApi>();
  private static config: IDaoApiConfig | null = null;

  private static async createDaoApi(daoEnsName: string) {
    if (!DaoApi.config) {
      throw new Error([
        'You need to set DaoApi config that create DaoApi.',
        'Use static method DaoApi.setConfig before creating DaoApi.',
      ].join(' '));
    }
    const daoApi = new DaoApi(DaoApi.config, daoEnsName);
    await daoApi.initialize();
    DaoApi.daos.set(daoEnsName, daoApi);
    return daoApi;
  }

  public store: DaoStore;
  private base: BaseDaoApi;
  private daoEnsName: string;

  private constructor(config: IDaoApiConfig, daoEnsName: string) {
    this.base = new BaseDaoApi(config);
    this.store = new DaoStore(this.base);
    this.daoEnsName = daoEnsName;
  }

  @bind
  public async getTokenAddress() {
    return this.base.call('Token Manager', 'token', null);
  }

  @bind
  public async requestAccess() {
    const account = await this.base.getAccount();

    if (!account) {
      throw new Error('Ethereum account is not found');
    }

    const params = [
      account,
      ONE_ERC20.toString(),
    ] as const;

    await this.base.sendTransaction('Token Manager', 'mint', params);
  }

  private async initialize() {
    await this.base.setDao(this.daoEnsName);
    await this.store.initialize();
  }
}
