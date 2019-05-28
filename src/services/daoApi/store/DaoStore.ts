import { Observable, empty } from 'rxjs';
import { observable, when } from 'mobx';

import { BaseDaoApi } from '../BaseDaoApi';
import { createTokenManagerStore, initialTokenManagerState } from './createTokenManagerStore';
import { createFinanceStore, initialFinanceState } from './createFinanceStore';
import { ITokenManagerState, IFinanceState } from './types';

export class DaoStore {
  @observable
  public tokenManager: ITokenManagerState = initialTokenManagerState;
  public tokenManager$: Observable<ITokenManagerState> = empty();

  @observable
  public finance: IFinanceState = initialFinanceState;
  public finance$: Observable<IFinanceState> = empty();

  private base: BaseDaoApi;

  public constructor(base: BaseDaoApi) {
    this.base = base;
  }

  public async initialize() {
    const tokenManagerApp = this.base.getAppByName('Token Manager');
    const financeApp = this.base.getAppByName('Finance');

    if (!tokenManagerApp || !financeApp) {
      throw new Error('Unable to initialize DaoStore because one of wrapper apps is missing');
    }

    this.tokenManager$ = await createTokenManagerStore(this.base.web3, tokenManagerApp.proxy);
    this.tokenManager$.subscribe(state => this.tokenManager = state);

    this.finance$ = await createFinanceStore(this.base.web3, financeApp.proxy);
    this.finance$.subscribe(state => this.finance = state);

    await when(() => (
      !!this.tokenManager && this.tokenManager.ready &&
      !!this.finance && this.finance.ready
    ));
  }
}
