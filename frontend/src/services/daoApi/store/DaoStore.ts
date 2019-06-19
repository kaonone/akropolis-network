import { Observable, empty } from 'rxjs';
import { observable, when, action } from 'mobx';
import { IAragonApp } from '@aragon/types';

import { AppType } from '../types';
import { BaseDaoApi } from '../BaseDaoApi';
import { InvestmentsApi } from '../InvestmentsApi';
import { createTokenManagerStore, initialTokenManagerState } from './createTokenManagerStore';
import { createFinanceStore, initialFinanceState } from './createFinanceStore';
import { createVotingStore, initialVotingState } from './createVotingStore';
import { createAgentStore, initialAgentState } from './createAgentStore';
import { ITokenManagerState, IFinanceState, IVotingState, IAgentState } from './types';

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

  @observable
  public agent: IAgentState = initialAgentState;
  public agent$: Observable<IAgentState> = empty();

  @observable
  public appTypeByAddress: Record<string, AppType> = {};

  private base: BaseDaoApi;
  private investments: InvestmentsApi;

  public constructor(base: BaseDaoApi, investments: InvestmentsApi) {
    this.base = base;
    this.investments = investments;
  }

  public async initialize() {
    if (!this.base.wrapper) {
      throw new Error('Unable to initialize DaoStore because aragon wrapper is not initialized');
    }

    const tokenManagerApp = this.base.getAppByName('token-manager');
    const financeApp = this.base.getAppByName('finance');
    const votingApp = this.base.getAppByName('voting');
    const agentApp = this.base.getAppByName('agent');
    const vaultApp = this.base.getAppByName('vault');

    this.setAppTypeByAddress([tokenManagerApp, financeApp, votingApp, agentApp, vaultApp]);

    this.tokenManager$ = await createTokenManagerStore(this.base.web3, tokenManagerApp.proxy);
    this.tokenManager$.subscribe(state => this.tokenManager = state);

    this.finance$ = await createFinanceStore(this.base.web3, financeApp.proxy);
    this.finance$.subscribe(state => this.finance = state);

    this.voting$ = await createVotingStore(this.base.wrapper, votingApp.proxy);
    this.voting$.subscribe(state => this.voting = state);

    this.agent$ = await createAgentStore(this.base.wrapper, this.investments, {
      agentProxy: agentApp.proxy,
      financeProxy: financeApp.proxy,
    });
    this.agent$.subscribe(state => this.agent = state);

    await when(() => (
      !!this.tokenManager && this.tokenManager.ready &&
      !!this.finance && this.finance.ready &&
      !!this.voting && this.voting.ready &&
      !!this.agent && this.agent.ready
    ));
  }

  @action
  private setAppTypeByAddress(apps: IAragonApp[]) {
    this.appTypeByAddress = apps.reduce<Record<string, AppType>>(
      (acc, cur) => ({
        ...acc,
        [cur.proxyAddress]: (cur.appName && cur.appName.split('.')[0]) as AppType,
      }),
      {},
    );
  }
}
