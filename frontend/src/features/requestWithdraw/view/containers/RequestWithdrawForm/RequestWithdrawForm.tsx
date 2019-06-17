import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useDaoApi } from 'services/daoApi';
import { isRequired, onEnglishPlease, composeValidators, useValidateRequestAmount } from 'shared/validators';
import { Request } from 'shared/view/elements/Icons';
import { RequestForm } from 'shared/view/components';
import { TextInputField, NumberInputField } from 'shared/view/form';
import { makeAsyncSubmit } from 'shared/helpers/makeAsyncSubmit';

import { IRequestFormData } from '../../../namespace';
import { StylesProps, provideStyles } from './RequestWithdrawForm.style';

const fieldNames: { [key in keyof IRequestFormData]: key } = {
  reason: 'reason',
  amount: 'amount',
};

const tKeys = tKeysAll.features.requestWithdraw;

interface IOwnProps {
  onSuccess(): void;
  onError(error: string): void;
  onCancel(): void;
}

type IProps = IOwnProps & StylesProps;

function RequestWithdrawForm(props: IProps) {
  const { onSuccess, onError, onCancel, classes } = props;
  const { t } = useTranslate();
  const daoApi = useDaoApi();

  const asyncSubmit = makeAsyncSubmit<IRequestFormData>(
    ({ amount, reason }) => daoApi.requestWithdraw(amount, reason),
    onSuccess,
    onError,
  );

  const validateRequestAmount = useValidateRequestAmount(daoApi);

  const validateWithdraw = React.useCallback((value: number) => {
    return isRequired(value) || validateRequestAmount(value);
  }, []);

  // tslint:disable:jsx-key
  const formFields = [
    (
      <NumberInputField
        suffix=" DAI"
        name={fieldNames.amount}
        label={t(tKeys.fields.amount.getKey())}
        validate={validateWithdraw}
        fullWidth
      />),
    (
      <TextInputField
        name={fieldNames.reason}
        label={t(tKeys.fields.reason.getKey())}
        validate={composeValidators(isRequired, onEnglishPlease)}
        fullWidth
      />),
  ];
  // tslint:enable:jsx-key

  return (
    <RequestForm
      onCancel={onCancel}
      onSubmit={asyncSubmit}
      cancelButton={t(tKeys.form.cancel.getKey())}
      submitButton={<>
        <Request className={classes.buttonIcon} />
        {t(tKeys.form.submit.getKey())}
      </>}
      fields={formFields}
    />
  );
}

export default provideStyles(RequestWithdrawForm);
