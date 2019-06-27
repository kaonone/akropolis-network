import * as React from 'react';
import { MarkAs } from '_helpers';
import { useObserver } from 'mobx-react-lite';

import { useDaoApi } from 'services/daoApi';
import { useIsMember } from 'services/user';
import { useTranslate, tKeys as tKeysAll, ITranslateKey } from 'services/i18n';

import { NumberInputField, TextInputField } from 'shared/view/form';
import { Metric, AsyncActionButton } from 'shared/view/components';
import { Grid, Typography } from 'shared/view/elements';
import { Info } from 'shared/view/elements/Icons';
import { formatDAI } from 'shared/helpers/format';
import { isRequired, composeValidators, lessThenOrEqual, onEnglishPlease, moreThen } from 'shared/validators';

import { StylesProps, provideStyles } from './DeFiAccount.style';

const tKeys = tKeysAll.features.deFiAccount;

interface IFormData {
  amount: number;
  reason: string;
}

const fieldNames: { [key in keyof IFormData]: key } = {
  amount: 'amount',
  reason: 'reason',
};

function DeFiAccount(props: StylesProps) {
  const { classes } = props;

  const daoApi = useDaoApi();
  const { t } = useTranslate();

  const deFiBalance = useObserver(() => daoApi.store.agent.availableBalance);
  const coopBalance = useObserver(() => daoApi.store.finance.vaultBalance);
  const isEnabled = useObserver(() => daoApi.store.agent.isEnabled);
  const supplied = useObserver(() => daoApi.store.suppliedToDeFi);
  const isMember = useIsMember(daoApi);

  const amountInput = (
    <NumberInputField
      suffix=" DAI"
      name={fieldNames.amount}
      label={t(tKeys.fields.amount.getKey())}
      fullWidth
    />
  );

  const reasonInput = (
    <TextInputField
      name={fieldNames.reason}
      label={t(tKeys.fields.reason.getKey())}
      fullWidth
    />
  );

  const validateWithdraw = React.useCallback(({ amount }: IFormData):
    Partial<MarkAs<ITranslateKey, IFormData>> => {
    return {
      amount: composeValidators<number>(
        isRequired,
        moreThen.bind(null, 0),
        lessThenOrEqual.bind(null, deFiBalance),
      )(amount),
    };
  }, [deFiBalance]);

  const validateDeposit = React.useCallback(({ amount, reason }: IFormData):
    Partial<MarkAs<ITranslateKey, IFormData>> => {
    return {
      amount: composeValidators<number>(
        isRequired,
        moreThen.bind(null, 0),
        lessThenOrEqual.bind(null, coopBalance),
      )(amount),
      reason: composeValidators<string>(isRequired, onEnglishPlease)(reason),
    };
  }, [coopBalance]);

  return (
    <div className={classes.root}>
      <Grid container spacing={24} alignItems="center">
        <Grid item xs={2}>
          <Metric
            title={t(tKeys.metrics.balance.getKey())}
            value={formatDAI(deFiBalance.toNumber(), 2)}
          />
        </Grid>
        <Grid item xs={2}>
          <Metric
            title={t(tKeys.metrics.supplied.getKey())}
            value={formatDAI(supplied.toNumber(), 2)}
          />
        </Grid>
        <Grid item xs={8}>
          <div className={classes.actionsCard}>
            <Grid container spacing={16} alignItems="center" >
              <Grid item><Info /></Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="subtitle1" component="div" className={classes.description}>
                  {isEnabled
                    ? t(tKeys.actionsDescription.enabled.getKey())
                    : t(tKeys.actionsDescription.disabled.getKey())
                  }
                </Typography>
              </Grid>
              {isEnabled && (<>
                <Grid item xs={3}>
                  <AsyncActionButton
                    buttonText={t(tKeys.actions.deposit.getKey())}
                    buttonProps={{ fullWidth: true, color: 'primary', disabled: !isMember }}
                    executeAction={daoApi.investments.deFiAccount.deposit}
                    form={{
                      fields: [amountInput, reasonInput],
                      title: t(tKeys.formTitles.deposit.getKey()),
                      submitButtonText: t(tKeys.actions.transfer.getKey()),
                      formProps: {
                        validate: validateDeposit,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <AsyncActionButton
                    buttonText={t(tKeys.actions.withdraw.getKey())}
                    buttonProps={{ fullWidth: true, color: 'primary', disabled: !isMember }}
                    executeAction={daoApi.investments.deFiAccount.withdraw}
                    form={{
                      fields: [amountInput],
                      title: t(tKeys.formTitles.withdraw.getKey()),
                      submitButtonText: t(tKeys.actions.transfer.getKey()),
                      formProps: {
                        validate: validateWithdraw,
                      },
                    }}
                  />
                </Grid>
              </>)}
              {!isEnabled && (
                <Grid item xs={3}>
                  <AsyncActionButton
                    buttonText={t(tKeys.actions.enable.getKey())}
                    buttonProps={{ fullWidth: true, color: 'primary', disabled: !isMember }}
                    executeAction={daoApi.investments.deFiAccount.enable}
                  />
                </Grid>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default provideStyles(DeFiAccount);
