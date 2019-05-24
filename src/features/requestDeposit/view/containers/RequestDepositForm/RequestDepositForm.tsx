import * as React from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { selectors as userSelectors } from 'services/user';
import { useDeps } from 'core';
import { isRequired } from 'shared/validators';
import { IAppReduxState } from 'shared/types/app';
import { Grid, Button, Typography } from 'shared/view/elements';
import { UserAvatar } from 'shared/view/components';
import { NumberInputField } from 'shared/view/form';
import { Deposit } from 'shared/view/elements/Icons';


import { IRequestDepositFormData } from '../../../namespace';

import { StylesProps, provideStyles } from './RequestDepositForm.style';

const fieldNames: { [key in keyof IRequestDepositFormData]: key } = {
  amount: 'amount',
};

interface IStateProps {
  userAddress: string | null;
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    userAddress: userSelectors.selectConfirmedAddress(state),
  };
}

const tKeys = tKeysAll.features.requestDeposit;

interface IOwnProps {
  onSuccess(): void;
  onError(error: string): void;
  onCancel(): void;
}

type IProps = IOwnProps & IStateProps & StylesProps;

function RequestDepositForm(props: IProps) {
  const { onSuccess, onError, onCancel, userAddress, classes } = props;
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

  return (
    <Form onSubmit={asyncSubmit} subscription={{ validating: true, submitting: true }}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <Grid container wrap="nowrap" justify="center">
                {userAddress && <UserAvatar address={userAddress} className={classes.address} />}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <NumberInputField
                suffix=" DAI"
                name={fieldNames.amount}
                label={t(tKeys.fields.amount.getKey())}
                validate={isRequired}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} >
              <div className={classes.hint}>
                <Typography>{t(tKeys.form.hint.getKey())}</Typography>
              </div>
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
                    <Deposit className={classes.buttonIcon} />
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
  connect(mapState)(provideStyles(RequestDepositForm))
);
