import * as React from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import { useDeps } from 'core';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { selectors as userSelectors } from 'services/user';
import { Exit } from 'shared/view/elements/Icons';
import { IAppReduxState } from 'shared/types/app';
import { Grid, Button } from 'shared/view/elements';
import { UserAvatar } from 'shared/view/components';
import { TextInputField } from 'shared/view/form';

import { IJoinToCooperativeFormData } from '../../../namespace';

import { StylesProps, provideStyles } from './JoinToCooperativeForm.style';

const fieldNames: { [key in keyof IJoinToCooperativeFormData]: key } = {
  reason: 'reason',
};

const initialValue: IJoinToCooperativeFormData = {
  reason: 'Join to cooperative',
}

interface IStateProps {
  userAddress: string | null;
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    userAddress: userSelectors.selectConfirmedAddress(state),
  };
}

const tKeys = tKeysAll.features.joinToCooperative;

interface IOwnProps {
  onSuccess(): void;
  onError(error: string): void;
  onCancel(): void;
}

type IProps = IOwnProps & IStateProps & StylesProps;

function RequestWithdrawForm(props: IProps) {
  const { onSuccess, onError, onCancel, userAddress, classes } = props;
  const { t } = useTranslate();

  const { daoApi } = useDeps();

  const asyncSubmit = React.useCallback(async () => {
    try {
      await daoApi.joinToCooperative();
      onSuccess();
    } catch (e) {
      onError(String(e));
    }
  }, []);

  return (
    <Form onSubmit={asyncSubmit} subscription={{ validating: true, submitting: true }} initialValues={initialValue}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <Grid container wrap="nowrap" justify="center">
                {userAddress && <UserAvatar address={userAddress} className={classes.address} />}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <TextInputField
                    name={fieldNames.reason}
                    label={t(tKeys.fields.reason.getKey())}
                    disabled
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={32}>
                <Grid item xs={6} container justify="flex-end" onClick={onCancel}>
                  <Button>{t(tKeys.form.cancel.getKey())}</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={submitting}
                  >
                    <Exit className={classes.buttonIcon} />
                    {t(tKeys.form.submit.getKey())}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}

export default (
  connect(mapState)(provideStyles(RequestWithdrawForm))
);
