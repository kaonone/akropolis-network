import * as React from 'react';
import { GetProps, MarkAsRequired } from '_helpers';
import { Form } from 'react-final-form';

import { useTranslate, tKeys } from 'services/i18n';

import { Button, CircleProgressBar } from 'shared/view/elements';
import { makeAsyncSubmit } from 'shared/helpers/makeAsyncSubmit';
import { useModalHandlers } from 'shared/helpers/useModalHandlers';
import { useCommunication, useOnChangeState } from 'shared/helpers/react';

import Modal from '../Modal/Modal';
import ErrorModal from '../ErrorModal/ErrorModal';
import RequestForm from '../RequestForm/RequestForm';
import { StylesProps, provideStyles } from './AsyncActionButton.style';

interface IOwnProps<V, F> {
  form?: {
    fields: React.ReactNode[],
    title: string,
    submitButtonText?: string,
    formProps?: Omit<GetProps<typeof Form>, 'onSubmit'>,
  };
  buttonProps?: GetProps<typeof Button>;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  executeAction(values?: F): Promise<V>;
  onSuccess?(result?: V): void;
  onFail?(error: string): void;
}

type IProps<V, F> = StylesProps & IOwnProps<V, F>;

function AsyncActionButton<V = void, F extends {} = {}>(props: IProps<V, F>) {
  const { classes, buttonProps, buttonIcon, buttonText, executeAction, form, onFail, onSuccess } = props;

  if (!form) {
    return (
      <SimpleActionButton
        buttonProps={buttonProps}
        executeAction={executeAction as () => Promise<V>}
        icon={buttonIcon}
        iconClassName={classes.buttonIcon}
        onFail={onFail}
        onSuccess={onSuccess}
        text={buttonText}
      />
    );
  }

  return <ActionButtonWithForm {...props} form={form} />;
}

interface ISimpleButtonProps<V = void> {
  text: string;
  buttonProps?: GetProps<typeof Button>;
  icon?: React.ReactNode;
  iconClassName: string;
  executeAction(): Promise<V>;
  onSuccess?(result?: V): void;
  onFail?(error: string): void;
}

function SimpleActionButton<V = void>(props: ISimpleButtonProps<V>) {
  const { executeAction, icon, iconClassName, onFail, onSuccess, text, buttonProps } = props;
  const {
    status, error, execute, result, resetState,
  } = useCommunication(executeAction, [], { resetStateOnExecute: true });

  useOnChangeState(
    status,
    (prev, cur) => prev !== 'success' && cur === 'success',
    () => onSuccess && onSuccess(result as V),
  );

  useOnChangeState(
    status,
    (prev, cur) => prev !== 'error' && cur === 'error',
    () => onFail && onFail(error),
  );

  return (
    <>
      <Button variant="contained" {...buttonProps} onClick={execute}>
        {!!icon && status !== 'pending' && <div className={iconClassName}>{icon}</div>}
        {status === 'pending' && <div className={iconClassName}><CircleProgressBar size={16} /></div>}
        {text}
      </Button>
      <ErrorModal
        isOpened={status === 'error'}
        onClose={resetState}
        onRetry={execute}
      />
    </>
  );
}

type IActionButtonWithFormProps<V, F> = MarkAsRequired<IProps<V, F>, 'form'>;

function ActionButtonWithForm<V = void, F extends {} = {}>(props: IActionButtonWithFormProps<V, F>) {
  const { executeAction, buttonIcon, classes, onFail, onSuccess, buttonText, buttonProps, form } = props;
  const { isOpened, error, closeModal, openModal, closeErrorModal, onRetry, onError } = useModalHandlers();
  const { t } = useTranslate();

  const asyncSubmit = React.useMemo(() => makeAsyncSubmit<F, V>(
    executeAction,
    result => {
      onSuccess && onSuccess(result);
      closeModal();
    },
    submitError => {
      onFail && onFail(submitError);
      onError(submitError);
    },
  ), [executeAction, onSuccess, onFail, closeModal, onError]);

  const renderButtonContent = React.useCallback((text: string) => (
    <>
      {!!buttonIcon && <div className={classes.buttonIcon}>{buttonIcon}</div>}
      {text}
    </>
  ), [buttonIcon]);

  return (
    <>
      <Button variant="contained" {...buttonProps} onClick={openModal}>
        {renderButtonContent(buttonText)}
      </Button>
      <Modal
        size="large"
        isOpen={isOpened && !error}
        title={form.title}
        onClose={closeModal}
      >
        <RequestForm
          {...form.formProps}
          onCancel={closeModal}
          onSubmit={asyncSubmit}
          cancelButton={t(tKeys.shared.cancel.getKey())}
          submitButton={renderButtonContent(form.submitButtonText || buttonText)}
          fields={form.fields}
        />
      </Modal>
      <ErrorModal
        isOpened={isOpened && !!error}
        onClose={closeErrorModal}
        onRetry={onRetry}
      />
    </>
  );
}

export default provideStyles(AsyncActionButton);
