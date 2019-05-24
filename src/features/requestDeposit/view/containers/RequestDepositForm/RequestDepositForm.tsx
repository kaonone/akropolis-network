import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useDeps } from 'core';
import { isRequired } from 'shared/validators';
import { Typography } from 'shared/view/elements';
import { RequestForm } from 'shared/view/components';
import { NumberInputField } from 'shared/view/form';
import { Deposit } from 'shared/view/elements/Icons';

import { IRequestDepositFormData } from '../../../namespace';

import { StylesProps, provideStyles } from './RequestDepositForm.style';

const fieldNames: { [key in keyof IRequestDepositFormData]: key } = {
  amount: 'amount',
};

const tKeys = tKeysAll.features.requestDeposit;

interface IOwnProps {
  onSuccess(): void;
  onError(error: string): void;
  onCancel(): void;
}

type IProps = IOwnProps & StylesProps;

function RequestDepositForm(props: IProps) {
  const { onSuccess, onError, onCancel, classes } = props;
  const { t } = useTranslate();

  const { daoApi } = useDeps();

  const asyncSubmit = React.useCallback(async (values: IRequestDepositFormData) => {
    try {
      await daoApi.requestDeposit(values.amount);
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
      <div className={classes.hint}>
        <Typography>{t(tKeys.form.hint.getKey())}</Typography>
      </div>),
  ];
  // tslint:enable:jsx-key

  return (
    <RequestForm
      onCancel={onCancel}
      onSubmit={asyncSubmit}
      cancelButton={t(tKeys.form.cancel.getKey())}
      submitButton={<>
        <Deposit className={classes.buttonIcon} />
        {t(tKeys.form.submit.getKey())}
      </>}
      fields={formFields}
    />
  );
}

export default provideStyles(RequestDepositForm);
