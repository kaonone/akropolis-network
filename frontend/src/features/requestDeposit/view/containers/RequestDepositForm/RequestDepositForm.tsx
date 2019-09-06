import * as React from 'react';
import { Link } from 'react-router-dom';
import routes from 'modules/routes';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useDaoApi } from 'services/daoApi';
import { isRequired } from 'shared/validators';
import { Typography } from 'shared/view/elements';
import { RequestForm } from 'shared/view/components';
import { NumberInputField } from 'shared/view/form';
import { Deposit } from 'shared/view/elements/Icons';
import { makeAsyncSubmit } from 'shared/helpers/makeAsyncSubmit';

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
  const daoApi = useDaoApi();

  const asyncSubmit = makeAsyncSubmit<IRequestDepositFormData>(
    ({ amount }) => daoApi.deposit(amount),
    onSuccess,
    onError,
  );

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
        <Typography>
          {'If you want to deposit more DAI, you can sell another tokens for DAI on '}
          <Link to={routes.account.getRedirectPath()}>account page</Link>
        </Typography>
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
