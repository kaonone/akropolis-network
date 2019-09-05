import accounting from 'accounting';
import BigNumber from 'bignumber.js';
import { GetProps } from '_helpers';
import SliderSelectField from 'shared/view/form/SliderSelectField/SliderSelectField';

export function formatUSD(value: number | BigNumber, precision: number = 2): string {
  return accounting.formatMoney(toNumber(value), { precision });
}

export function formatDAI(value: number | BigNumber, precision: number = 0): string {
  return `${accounting.formatNumber(toNumber(value), precision)} DAI`;
}

export const formatNumber = accounting.formatNumber;

export function formatPercent(value: number | BigNumber, precision?: number): string {
  return accounting.formatNumber(toNumber(value), precision) + '%';
}

export const formatSliderLabelDefault: NonNullable<GetProps<typeof SliderSelectField>['formatLabel']> =
  item => item.label || '';

export function shortenString(value: string, maxLength: number): string {
  return value.length <= maxLength
    ? value
    : `${value.slice(0, Math.floor(maxLength / 2))}...${value.slice(-Math.ceil(maxLength / 2))}`;
}

function toNumber(value: number | BigNumber): number {
  return BigNumber.isBigNumber(value) ? value.toNumber() : value;
}
