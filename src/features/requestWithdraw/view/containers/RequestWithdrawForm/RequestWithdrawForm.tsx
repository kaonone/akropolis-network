import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useDaoApi } from 'services/daoApi';
import { isRequired, onEnglishPlease, composeValidators } from 'shared/validators';
import { Request } from 'shared/view/elements/Icons';
import { CircleProgressBar } from 'shared/view/elements';
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
  const [isRequesting, setIsRequesting] = React.useState(false);

  const asyncSubmit = React.useCallback(async (values: IRequestFormData) => {
    try {
      setIsRequesting(true);
      await daoApi.requestWithdraw(values.amount, values.reason);
      setIsRequesting(false);
      onSuccess();
    } catch (e) {
      setIsRequesting(false);
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
        {isRequesting && <CircleProgressBar className={classes.buttonIcon} size={16} />}
        {!isRequesting && <Request className={classes.buttonIcon} />}
        {t(tKeys.form.submit.getKey())}
      </>}
      fields={formFields}
    />
  );
}

export default provideStyles(RequestWithdrawForm);
