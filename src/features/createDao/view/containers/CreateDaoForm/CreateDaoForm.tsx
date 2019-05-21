import * as React from 'react';
import * as R from 'ramda';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import { tKeys, useTranslate } from 'services/i18n';

import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { isNameUsed } from 'shared/helpers/aragon-wrapper';
import { isRequired, composeValidators, maxStringLength, allowedCharactersForDaoName } from 'shared/validators';
import { Grid, Button } from 'shared/view/elements';
import { TextInputField, NumberInputField } from 'shared/view/form';

import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import { ICreateFormData } from '../../../namespace';

const fieldNames: { [key in keyof ICreateFormData]: key } = {
  domainName: 'domainName',
  description: 'description',
  goal: 'goal',
};

interface IStateProps {
  creating: ICommunication;
}

type IProps = IStateProps & typeof mapDispatch;

function mapState(state: IAppReduxState): IStateProps {
  return {
    creating: selectors.selectCommunication(state, 'daoCreating'),
  };
}

const mapDispatch = {
  createDao: actions.createDao,
};

const intl = tKeys.features.createDao;

const validateDaoNameUsed = R.memoizeWith(R.identity, async (domain: string) => {
  const isUsed = await isNameUsed(domain);
  return isUsed ? tKeys.shared.validation.isUsedDaoName.getKey() : undefined;
});

const syncValidateDao = composeValidators(isRequired, maxStringLength.bind(null, 30), allowedCharactersForDaoName);

async function validateDaoName(domain: string) {
  return syncValidateDao(domain) || validateDaoNameUsed(domain);
}

function CreateDaoForm(props: IProps) {
  const { createDao, creating } = props;
  const { t } = useTranslate();
  return (
    <Form onSubmit={createDao} subscription={{ validating: true, submitting: true }}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <TextInputField
                    name={fieldNames.domainName}
                    label={t(intl.fields.domainName.getKey())}
                    validate={validateDaoName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumberInputField
                    suffix=" DAI"
                    name={fieldNames.goal}
                    label={t(intl.fields.goal.getKey())}
                    validate={isRequired}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputField
                    name={fieldNames.description}
                    label={t(intl.fields.description.getKey())}
                    validate={isRequired}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={32}>
                <Grid item xs={6} container justify="flex-end">
                  <Button>{t(intl.form.cancel.getKey())}</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={submitting || creating.isRequesting}
                  >
                    {t(intl.form.submit.getKey())}
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
  connect(mapState, mapDispatch)(CreateDaoForm)
);
