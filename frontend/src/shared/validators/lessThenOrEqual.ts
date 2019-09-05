import BigNumber from 'bignumber.js';
import { tKeys, ITranslateKey } from 'services/i18n';

export function lessThenOrEqual(value: number | BigNumber, currentValue: number): ITranslateKey | undefined {
  const isValid = BigNumber.isBigNumber(value)
    ? value.isGreaterThanOrEqualTo(currentValue)
    : currentValue <= value;

  return isValid ? undefined : {
    key: tKeys.shared.validation.lessThenOrEqual.getKey(),
    params: { value: new (BigNumber.clone({ EXPONENTIAL_AT: 1e+9 }))(value).toString() },
  };
}
