import * as React from 'react';
import BigNumber from 'bignumber.js';
import { useObserver } from 'mobx-react-lite';

import { useDaoApi } from 'services/daoApi';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { NumberInputField, TextInputField } from 'shared/view/form';
import { Metric, AsyncActionButton } from 'shared/view/components';
import { Grid, Typography } from 'shared/view/elements';
import { Info } from 'shared/view/elements/Icons';
import { formatDAI } from 'shared/helpers/format';
import { isRequired } from 'shared/validators';

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
  const isEnabled = useObserver(() => daoApi.store.agent.isEnabled);
  const investments = useObserver(() => daoApi.store.agent.investments);

  const supplied = React.useMemo(
    () => BigNumber.sum(...Object.values(investments).map(item => item.balance)),
    [investments],
  );

  const amountInput = (
    <NumberInputField
      suffix=" DAI"
      name={fieldNames.amount}
      label={t(tKeys.fields.amount.getKey())}
      validate={isRequired}
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
                <Typography variant="subtitle1" component="div">
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
                    buttonProps={{ fullWidth: true, color: 'primary' }}
                    executeAction={daoApi.investments.deFiAccount.deposit}
                    form={{
                      fields: [amountInput, reasonInput],
                      title: t(tKeys.formTitles.deposit.getKey()),
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <AsyncActionButton
                    buttonText={t(tKeys.actions.withdraw.getKey())}
                    buttonProps={{ fullWidth: true, color: 'primary' }}
                    executeAction={daoApi.investments.deFiAccount.withdraw}
                    form={{
                      fields: [amountInput],
                      title: t(tKeys.formTitles.withdraw.getKey()),
                    }}
                  />
                </Grid>
              </>)}
              {!isEnabled && (
                <Grid item xs={3}>
                  <AsyncActionButton
                    buttonText={t(tKeys.actions.enable.getKey())}
                    buttonProps={{ fullWidth: true, color: 'primary' }}
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
