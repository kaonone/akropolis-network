import { bind } from 'decko';
import { OneDAI } from 'shared/model/calculate';
import { IDaoApiConfig } from './types';
import { BaseDaoApi } from './BaseDaoApi';

export class DaoApi {
  private base: BaseDaoApi;

  constructor(config: IDaoApiConfig) {
    this.base = new BaseDaoApi(config);
  }

  @bind
  public async setDao(daoEnsName: string) {
    return this.base.setDao(daoEnsName);
  }

  @bind
  public async requestAccess() {
    const account = await this.base.getAccount();

    if (!account) {
      throw new Error('Ethereum account is not found');
    }

    const params = [
      account,
      OneDAI.toString(),
    ] as const;

    await this.base.sendTransaction('Token Manager', 'mint', params);
  }
}
