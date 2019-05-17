import accounting from 'accounting';
import { GetProps } from '_helpers';
import SliderSelectField from 'shared/view/form/SliderSelectField/SliderSelectField';

export function formatUSD(value: number, precision: number = 2): string {
  return accounting.formatMoney(value, { precision });
}

export const formatNumber = accounting.formatNumber;

export function formatPercent(value: number, precision?: number): string {
  return accounting.formatNumber(value, precision) + '%';
}

export const formatSliderLabelDefault: NonNullable<GetProps<typeof SliderSelectField>['formatLabel']> =
  item => item.label || '';

export function shortenString(value: string, maxLength: number): string {
  return value.length <= maxLength
    ? value
    : `${value.slice(0, Math.floor(maxLength / 2))}...${value.slice(-Math.ceil(maxLength / 2))}`;
}
