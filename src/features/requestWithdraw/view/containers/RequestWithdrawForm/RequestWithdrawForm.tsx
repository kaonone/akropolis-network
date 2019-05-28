import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useDaoApi } from 'services/daoApi';
import { isRequired } from 'shared/validators';
import { Request } from 'shared/view/elements/Icons';
import { RequestForm } from 'shared/view/components';
import { TextInputField, NumberInputField } from 'shared/view/form';

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

  const asyncSubmit = React.useCallback(async (values: IRequestFormData) => {
    try {
      await daoApi.requestWithdraw(values.amount, values.reason);
      onSuccess();
    } catch (e) {
      onError(String(e));
    }
  }, []);

  // tslint:disable:jsx-key
  const formFields = [
    (
      <NumberInputField
        suffix=" DAI"
        name={fieldNames.amount}
        label={t(tKeys.fields.amount.getKey())}
        validate={isRequired}
        fullWidth
      />),
    (
      <TextInputField
        name={fieldNames.reason}
        label={t(tKeys.fields.reason.getKey())}
        validate={isRequired}
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
