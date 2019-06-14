import BigNumber from 'bignumber.js';

import CompoundABI from 'blockchain/abi/compoundCToken.json';
import Erc20ABI from 'blockchain/abi/erc20.json';
import { NETWORK_CONFIG } from 'core/constants';
import { UINT256_MAX, ONE_ERC20 } from 'shared/constants';
import { InvestmentType, IInvestmentApi } from 'shared/types/models/Investment';

import { BaseDaoApi } from './BaseDaoApi';

export class InvestmentsApi implements Record<InvestmentType, IInvestmentApi> {
  public compound: IInvestmentApi = {
    enable: () => this.base.executeOnAgent(
      NETWORK_CONFIG.daiContract,
      'approve(address,uint256)',
      [
        NETWORK_CONFIG.daiCompound,
        UINT256_MAX,
      ],
    ),

    deposit: (amount: number) => this.base.executeOnAgent(
      NETWORK_CONFIG.daiCompound,
      'mint(uint256)',
      [ONE_ERC20.times(amount).toString()],
    ),

    withdraw: (amount: number) => this.base.executeOnAgent(
      NETWORK_CONFIG.daiCompound,
      'redeemUnderlying(uint256)',
      [ONE_ERC20.times(amount).toString()],
    ),

    getBalance: async (agentAddress: string) => {
      const balance = await this.base.callExternal<string>(
        NETWORK_CONFIG.daiCompound,
        CompoundABI,
        'balanceOfUnderlying',
        [agentAddress],
      );
      return new BigNumber(balance).div(ONE_ERC20);
    },

    getEarn: async (_agentAddress: string) => {
      return new BigNumber(0); // TODO ds: calculate this
    },

    isEnabled: async (agentAddress: string) => {
      const approvedAmount = await this.base.callExternal<string>(
        NETWORK_CONFIG.daiContract,
        Erc20ABI,
        'allowance',
        [agentAddress, NETWORK_CONFIG.daiCompound],
      );
      return !!Number(approvedAmount);
    },

    getCurrentRate: async () => {
      const secondsInYear = 360 * 24 * 60 * 60;
      const secondsPerBlock = 15;
      const ratePerBlock = await this.base.callExternal<string>(
        NETWORK_CONFIG.daiCompound,
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
