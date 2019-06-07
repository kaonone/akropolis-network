import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Button } from 'shared/view/elements';
import { Modal, ErrorModal } from 'shared/view/components';
import { Deposit } from 'shared/view/elements/Icons';
import { useModalOpenHandlers } from 'shared/helpers/useModalOpenHandlers';

import RequestWithdrawForm from '../RequestDepositForm/RequestDepositForm';
import { StylesProps, provideStyles } from './RequestDepositButton.style';

const tKeys = tKeysAll.features.requestDeposit;

type IProps = StylesProps;

function RequestDepositButton(props: IProps) {
  const { classes } = props;
  const { t } = useTranslate();

  const { isOpened, error, closeModal, openModal, closeErrorModal, onRetry, onError } = useModalOpenHandlers();

  return (
    <>
      <Button variant="contained" color="secondary" onClick={openModal}>
        <Deposit className={classes.buttonIcon} />
        {t(tKeys.button.getKey())}
      </Button>
      <Modal
        size="large"
        isOpen={isOpened && !error}
        title={t(tKeys.form.title.getKey())}
        onClose={closeModal}
      >
        <RequestWithdrawForm
          onSuccess={closeModal}
          onError={onError}
          onCancel={closeModal}
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

export default provideStyles(RequestDepositButton);
