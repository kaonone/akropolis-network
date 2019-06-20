import { toFixed as _toFixed } from 'accounting';
import BigNumber from 'bignumber.js';

export function toFixed(value: number, digits: number) {
  return _toFixed(value, digits);
}

export function calculateGrowth(previous: BigNumber, current: BigNumber) {
  return current.minus(previous).div(previous.abs()).times(100);
}
