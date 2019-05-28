import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useDaoApi } from 'services/daoApi';
import { Exit } from 'shared/view/elements/Icons';
import { RequestForm } from 'shared/view/components';
import { TextInputField } from 'shared/view/form';

import { IJoinToCooperativeFormData } from '../../../namespace';
import { StylesProps, provideStyles } from './JoinToCooperativeForm.style';

const fieldNames: { [key in keyof IJoinToCooperativeFormData]: key } = {
  reason: 'reason',
};

const initialValue: IJoinToCooperativeFormData = {
  reason: 'Join to cooperative',
};

const tKeys = tKeysAll.features.joinToCooperative;

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

  const asyncSubmit = React.useCallback(async () => {
    try {
      await daoApi.joinToCooperative();
      onSuccess();
    } catch (e) {
      onError(String(e));
    }
  }, []);

  // tslint:disable:jsx-key
  const formFields = [
    (
      <TextInputField
        name={fieldNames.reason}
        label={t(tKeys.fields.reason.getKey())}
        disabled
        fullWidth
      />),
  ];
  // tslint:enable:jsx-key

  return (
    <RequestForm
      onCancel={onCancel}
      onSubmit={asyncSubmit}
      initialValues={initialValue}
      cancelButton={t(tKeys.form.cancel.getKey())}
      submitButton={<>
        <Exit className={classes.buttonIcon} />
        {t(tKeys.form.submit.getKey())}
      </>}
      fields={formFields}
    />
  );
}

export default provideStyles(RequestWithdrawForm);
