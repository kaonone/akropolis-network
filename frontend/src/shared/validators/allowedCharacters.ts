import { tKeys, ITranslateKey } from 'services/i18n';

export function allowedCharactersForDaoName(value: string): ITranslateKey | undefined {
  const validationRegExp = new RegExp(`^[a-zA-Z\\d]+$`);
  return value && !validationRegExp.test(value)
    ? tKeys.shared.validation.allowedCharactersForDaoName.getKey()
    : undefined;
}
