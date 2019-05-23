import { bind } from 'decko';
import { ONE_ERC20 } from 'shared/constants';
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
}
