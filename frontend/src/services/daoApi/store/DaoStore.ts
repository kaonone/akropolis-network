import BigNumber from 'bignumber.js';
import { Observable, empty } from 'rxjs';
import { observable, when, action, computed } from 'mobx';
import { IAragonApp } from '@aragon/types';

import { addressesEqual } from 'shared/helpers/web3';
import { AppType } from '../types';
import { BaseDaoApi } from '../BaseDaoApi';
import { InvestmentsApi } from '../InvestmentsApi';
import { createTokenManagerStore, initialTokenManagerState } from './createTokenManagerStore';
import { createFinanceStore, initialFinanceState } from './createFinanceStore';
import { createVotingStore, initialVotingState } from './createVotingStore';
import { createAgentStore, initialAgentState } from './createAgentStore';
import { ITokenManagerState, IFinanceState, IVotingState, IAgentState, IDaoOverview } from './types';

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

  @computed
  public get coopBalanceOverview(): IDaoOverview {
    const agentApp = this.base.getAppByName('agent');
    const agentAddress = agentApp.proxyAddress;

    const allHolders = Object.values(this.finance.holders);
    const { holdersForDay: allHoldersForDay, vaultBalance: daoBalance } = this.finance;
    const { availableBalance: agentBalance } = this.agent;
    const suppliedToDeFi = this.suppliedToDeFi;

    const holdersWithoutAgent = allHolders.filter(item => !addressesEqual(item.address, agentAddress));
    const holdersForDayWithoutAgent = allHoldersForDay.filter(item => !addressesEqual(item.address, agentAddress));

    const balanceChangeForDay = BigNumber.sum(...holdersForDayWithoutAgent.map(item => item.balance));
    const depositChangeForDay = BigNumber.sum(...holdersForDayWithoutAgent.map(item => item.deposit));
    const withdrawChangeForDay = BigNumber.sum(...holdersForDayWithoutAgent.map(item => item.withdraw));

    const daoDeposit = BigNumber.sum(...Object.values(holdersWithoutAgent).map(item => item.deposit));
    const daoWithdraw = BigNumber.sum(...Object.values(holdersWithoutAgent).map(item => item.withdraw));
    const daoDeFi = agentBalance.plus(suppliedToDeFi);
    const daoEarned = daoBalance.plus(daoDeFi).minus(daoDeposit).plus(daoWithdraw);

    const daoOverview: IDaoOverview = {
      balance: {
        value: daoBalance,
        valueDayAgo: daoBalance.minus(balanceChangeForDay),
      },
      deposit: {
        value: daoDeposit,
        valueDayAgo: daoDeposit.minus(depositChangeForDay),
      },
      withdraw: {
        value: daoWithdraw,
        valueDayAgo: daoWithdraw.minus(withdrawChangeForDay),
      },
      deFi: {
        value: daoDeFi,
        valueDayAgo: new BigNumber(0),
      },
      earned: {
        value: daoEarned,
        valueDayAgo: new BigNumber(0),
      },
    };

    return daoOverview;
  }

  @computed
  public get suppliedToDeFi() {
    const { investments } = this.agent;
    return BigNumber.sum(...Object.values(investments).map(item => item.balance));
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
