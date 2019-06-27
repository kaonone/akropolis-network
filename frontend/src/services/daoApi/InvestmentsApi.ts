import BigNumber from 'bignumber.js';

import CompoundABI from 'blockchain/abi/compoundCToken.json';
import Erc20ABI from 'blockchain/abi/erc20.json';
import { NETWORK_CONFIG } from 'core/constants';
import { UINT256_MAX, ONE_ERC20 } from 'shared/constants';
import { InvestmentType, IInvestmentApi, ICompoundAccountApiResponse } from 'shared/types/models';

import { BaseDaoApi } from './BaseDaoApi';
import { addressesEqual } from 'shared/helpers/web3';

export class InvestmentsApi implements Record<InvestmentType, IInvestmentApi> {
  public deFiAccount = {
    enable: () => this.base.executeOnAgent(
      NETWORK_CONFIG.daiContract,
      'approve(address,uint256)',
      [
        this.base.getAppByName('finance').proxyAddress,
        UINT256_MAX,
      ],
    ),

    deposit: ({ amount, reason }: { amount: number, reason: string }) => this.base.sendTransaction(
      'finance',
      'newImmediatePayment',
      [
        NETWORK_CONFIG.daiContract,
        this.base.getAppByName('agent').proxyAddress,
        ONE_ERC20.multipliedBy(amount).toFixed(),
        reason,
      ],
    ),

    withdraw: ({ amount }: { amount: number }) => this.base.executeOnAgent(
      this.base.getAppByName('finance').proxyAddress,
      'deposit(address,uint256,string)',
      [
        NETWORK_CONFIG.daiContract,
        ONE_ERC20.multipliedBy(amount).toFixed(),
        'deposit',
      ],
    ),

    isEnabled: async () => {
      const approvedAmount = await this.base.callExternal<string>(
        NETWORK_CONFIG.daiContract,
        Erc20ABI,
        'allowance',
        [
          this.base.getAppByName('agent').proxyAddress,
          this.base.getAppByName('finance').proxyAddress,
        ],
      );
      return !!Number(approvedAmount);
    },
  };

  public compound: IInvestmentApi = {
    enable: () => this.base.executeOnAgent(
      NETWORK_CONFIG.daiContract,
      'approve(address,uint256)',
      [
        NETWORK_CONFIG.investments.compound,
        UINT256_MAX,
      ],
    ),

    deposit: (amount: number) => this.base.executeOnAgent(
      NETWORK_CONFIG.investments.compound,
      'mint(uint256)',
      [ONE_ERC20.times(amount).toFixed()],
    ),

    withdraw: (amount: number) => this.base.executeOnAgent(
      NETWORK_CONFIG.investments.compound,
      'redeemUnderlying(uint256)',
      [ONE_ERC20.times(amount).toFixed()],
    ),

    getBalance: async () => {
      const balance = await this.base.callExternal<string>(
        NETWORK_CONFIG.investments.compound,
        CompoundABI,
        'balanceOfUnderlying',
        [this.base.getAppByName('agent').proxyAddress],
      );
      return new BigNumber(balance).div(ONE_ERC20);
    },

    getEarn: async () => {
      const apiUrl = NETWORK_CONFIG.compoundAccountApiUrl;
      const accountAddress = this.base.getAppByName('agent').proxyAddress;

      try {
        const fetchResponse = await fetch(`${apiUrl}?addresses[]=${accountAddress}`);
        const apiResponse: ICompoundAccountApiResponse = await fetchResponse.json();

        if (apiResponse.error !== null) {
          throw new Error(`
            Compound account api returns error with code ${apiResponse.error}.
            For more details go to https://compound.finance/developers/api#AccountResponse
          `);
        }

        const account = apiResponse.accounts[0];
        const token = account && account.tokens.find(
          item => addressesEqual(item.address, NETWORK_CONFIG.investments.compound),
        );

        if (!token) {
          return new BigNumber(0);
        }

        return new BigNumber(token.supply_balance_underlying.value)
          .times(token.lifetime_supply_interest_accrued.value)
          .div(100);
      } catch (error) {
        console.error(error);
        return new BigNumber(0);
      }
    },

    isEnabled: async () => {
      const approvedAmount = await this.base.callExternal<string>(
        NETWORK_CONFIG.daiContract,
        Erc20ABI,
        'allowance',
        [
          this.base.getAppByName('agent').proxyAddress,
          NETWORK_CONFIG.investments.compound,
        ],
      );
      return !!Number(approvedAmount);
    },

    getCurrentRate: async () => {
      const secondsInYear = 365 * 24 * 60 * 60;
      const secondsPerBlock = 15;
      const ratePerBlock = await this.base.callExternal<string>(
        NETWORK_CONFIG.investments.compound,
        CompoundABI,
        'supplyRatePerBlock',
      );
      return new BigNumber(ratePerBlock).div(ONE_ERC20).times(secondsInYear).div(secondsPerBlock).times(100);
    },
  };

  private base: BaseDaoApi;

  public constructor(base: BaseDaoApi) {
    this.base = base;
  }
}
