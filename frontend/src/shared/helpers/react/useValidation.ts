import { useMemo } from 'react';
import { ITranslateKey } from 'services/i18n';

type Validator<V> = (value: V) => ITranslateKey | undefined;

export default function useValidation<V>(value: V, validator: Validator<V> | Array<Validator<V>>) {
  const validators = new Array<Validator<V>>().concat(validator);
  return useMemo(() => {
    let error: ITranslateKey | undefined;
    validators.some(validate => {
      error = validate(value);
      return Boolean(error);
    });
    return error;
  }, [value, ...validators]);
}
