import { ITranslateKey } from 'services/i18n';

type Validator<T> = (value: T) => string | ITranslateKey | undefined;

export function composeValidators<T>(...validators: Array<Validator<T>>) {
  return (value: T) => validators.reduce((error, validator) => error || validator(value), void 0);
}
