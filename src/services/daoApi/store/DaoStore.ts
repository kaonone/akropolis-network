import { Observable, empty } from 'rxjs';
import { observable, when } from 'mobx';

import { BaseDaoApi } from '../BaseDaoApi';
import { createTokenManagerStore, initialTokenManagerState } from './createTokenManagerStore';
import { ITokenManagerState } from './types';

export class DaoStore {
  @observable
  public tokenManager: ITokenManagerState = initialTokenManagerState;
  public tokenManager$: Observable<ITokenManagerState> = empty();

  private base: BaseDaoApi;

  public constructor(base: BaseDaoApi) {
    this.base = base;
  }

  public async initialize() {
    const tokenManagerApp = this.base.getAppByName('Token Manager');

    if (!tokenManagerApp) {
      throw new Error('Unable to initialize DaoStore because one of wrapper apps is missing');
    }

    this.tokenManager$ = await createTokenManagerStore(this.base.web3, tokenManagerApp.proxy);
    this.tokenManager$.subscribe(state => this.tokenManager = state);

    await when(() => !!this.tokenManager && this.tokenManager.ready);
  }
}
