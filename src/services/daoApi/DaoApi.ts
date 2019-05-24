import { bind } from 'decko';
import { ONE_ERC20 } from 'shared/constants';
import { IDaoApiConfig, ITransitionPeriod } from './types';
import { BaseDaoApi } from './BaseDaoApi';
import { NETWORK_CONFIG } from 'core/constants/network';

const ETHER_TOKEN_FAKE_ADDRESS = '0x0000000000000000000000000000000000000000';

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
  public async joinToCooperative() {
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

  @bind
  public async requestWithdraw(amount: number, reason: string) {
    const account = await this.base.getAccount();

    if (!account) {
      throw new Error('Ethereum account is not found');
    }

    const tokenAddress = NETWORK_CONFIG.daiContract;
    const resultAmount = ONE_ERC20.multipliedBy(amount).toString();
    const params = [
      tokenAddress,
      account,
      resultAmount,
      reason,
    ] as const;

    await this.base.sendTransaction('Finance', 'newImmediatePayment', params);
  }

  @bind
  public async requestDeposit(amount: number) {
    const account = await this.base.getAccount();

    if (!account) {
      throw new Error('Ethereum account is not found');
    }

    const tokenAddress = NETWORK_CONFIG.daiContract;

    const resultAmount = ONE_ERC20.multipliedBy(amount).toString();
    const reference = 'requestDeposit';

    const periodDuration: string = await this.base.call('Finance', 'getPeriodDuration', null);
    const currentPeriodId: string = await this.base.call('Finance', 'currentPeriodId', null);
    const currentPeriod: ITransitionPeriod = await this.base.call('Finance', 'getPeriod', [currentPeriodId]);

    let intentParams;

    if (tokenAddress === ETHER_TOKEN_FAKE_ADDRESS) {
      intentParams = { value: resultAmount };
    } else {
      // Get the number of period transitions necessary; we floor because we don't need to
      // transition the current period
      const lastPeriodStart = Number(currentPeriod.startTime);
      const periodTransitions = Math.floor(
        Math.max(Date.now() / 1000 - lastPeriodStart, 0) / Number(periodDuration),
      );

      intentParams = {
        token: { address: tokenAddress, value: resultAmount },
        // While it's generally a bad idea to hardcode gas in intents, in the case of token deposits
        // it prevents metamask from doing the gas estimation and telling the user that their
        // transaction will fail (before the approve is mined).
        // The actual gas cost is around ~180k + 20k per 32 chars of text + 80k per period
        // transition but we do the estimation with some breathing room in case it is being
        // forwarded (unlikely in deposit).
        gas:
          400000 +
          20000 * Math.ceil(reference.length / 32) +
          80000 * periodTransitions,
      };
    }

    const params = [
      tokenAddress,
      resultAmount,
      reference,
      intentParams,
    ] as const;

    await this.base.sendTransaction('Finance', 'deposit', params);
  }
}
