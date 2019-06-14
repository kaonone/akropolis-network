import * as moment from 'moment';
import BigNumber from 'bignumber.js';

// tslint:disable:max-line-length
export const c2fcContractName = 'C2FCFull';
export const messageForSignature = 'Signing this message proves to Akropolis Network you are in control of your account and allows Akropolis Network to operate with heightened security while never storing any sensitive account information';

export const DECIMAL = 18;
export const DEFAULT_ORDER_EXPIRATION_DURATION = new BigNumber(moment.duration(7, 'day').asSeconds());
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ZERO = new BigNumber(0);
export const ONE_ERC20 = new BigNumber('1e18');
export const ONE_С_ERC20 = new BigNumber('1e8');
export const UINT256_MAX = new BigNumber(2).pow(256).minus(1).toFixed();
