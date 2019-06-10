import { tKeys, ITranslateKey } from 'services/i18n';

export function onEnglishPlease(value: any): ITranslateKey | undefined {
  const validationRegExp = new RegExp(`^([\\w\\s])+$`);
  return value && !validationRegExp.test(value)
    ? tKeys.shared.validation.allowedCharactersForDaoName.getKey()
    : undefined;
}
