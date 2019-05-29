import { Observable, empty } from 'rxjs';
import { observable, when } from 'mobx';

import { BaseDaoApi } from '../BaseDaoApi';
import { createTokenManagerStore, initialTokenManagerState } from './createTokenManagerStore';
import { createFinanceStore, initialFinanceState } from './createFinanceStore';
import { createVotingStore, initialVotingState } from './createVotingStore';
import { ITokenManagerState, IFinanceState, IVotingState } from './types';

export class DaoStore {
  @observable
  public tokenManager: ITokenManagerState = initialTokenManagerState;
  public tokenManager$: Observable<ITokenManagerState> = empty();

  @observable
  public finance: IFinanceState = initialFinanceState;
  public finance$: Observable<IFinanceState> = empty();

  @observable
  public voting: IVotingState = initialVotingState;
  public voting$: Observable<IVotingState> = empty();

  private base: BaseDaoApi;

  public constructor(base: BaseDaoApi) {
    this.base = base;
  }

  public async initialize() {
    const tokenManagerApp = this.base.getAppByName('Token Manager');
    const financeApp = this.base.getAppByName('Finance');
    const votingApp = this.base.getAppByName('Voting');

    if (!tokenManagerApp || !financeApp || !votingApp) {
      throw new Error('Unable to initialize DaoStore because one of wrapper apps is missing');
    }

    if (!this.base.wrapper) {
      throw new Error('Unable to initialize DaoStore because aragon wrapper is not initialized');
    }

    this.tokenManager$ = await createTokenManagerStore(this.base.web3, tokenManagerApp.proxy);
    this.tokenManager$.subscribe(state => this.tokenManager = state);

    this.finance$ = await createFinanceStore(this.base.web3, financeApp.proxy);
    this.finance$.subscribe(state => this.finance = state);

    this.voting$ = await createVotingStore(this.base.wrapper, votingApp.proxy);
    this.voting$.subscribe(state => this.voting = state);

    await when(() => (
      !!this.tokenManager && this.tokenManager.ready &&
      !!this.finance && this.finance.ready &&
      !!this.voting && this.voting.ready
    ));
  }
}
