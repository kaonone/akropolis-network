import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';

import { tKeys, useTranslate } from 'services/i18n';

import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { isNameUsed } from 'shared/helpers/aragon-wrapper';
import { isRequired, composeValidators, maxStringLength, allowedCharactersForDaoName } from 'shared/validators';
import { TextInputField, NumberInputField } from 'shared/view/form';
import { RequestForm } from 'shared/view/components';
import { DAO_GOAL, DAO_DESCRIPTION } from 'services/daoApi';

import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import { ICreateFormData } from '../../../namespace';

const fieldNames: { [key in keyof ICreateFormData]: key } = {
  domainName: 'domainName',
  description: 'description',
  goal: 'goal',
};

const initialValues: ICreateFormData = {
  domainName: '',
  description: DAO_DESCRIPTION,
  goal: DAO_GOAL,
};

interface IStateProps {
  creating: ICommunication;
}

interface IOwnProps {
  onCancel(): void;
}

type IProps = IOwnProps & IStateProps & typeof mapDispatch;

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
  const { createDao, creating, onCancel } = props;
  const { t } = useTranslate();

  // tslint:disable:jsx-key
  const formFields = [
    (
      <TextInputField
        name={fieldNames.domainName}
        label={t(intl.fields.domainName.getKey())}
        validate={validateDaoName}
        fullWidth
      />),
    (
      <NumberInputField
        suffix=" DAI"
        name={fieldNames.goal}
        label={t(intl.fields.goal.getKey())}
        validate={isRequired}
        fullWidth
        disabled
      />),
    (
      <TextInputField
        name={fieldNames.description}
        label={t(intl.fields.description.getKey())}
        validate={isRequired}
        fullWidth
        disabled
      />),
  ];
  // tslint:enable:jsx-key

  return (
    <RequestForm
      onCancel={onCancel}
      onSubmit={createDao}
      initialValues={initialValues}
      cancelButton={t(intl.form.cancel.getKey())}
      submitButton={t(intl.form.submit.getKey())}
      withoutAddress
      fields={formFields}
      disabled={creating.isRequesting}
    />
  );
}

export default (
  connect(mapState, mapDispatch)(CreateDaoForm)
);
