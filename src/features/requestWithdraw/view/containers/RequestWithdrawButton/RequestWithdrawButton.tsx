import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

import { Button } from 'shared/view/elements';
import { Modal, ErrorModal } from 'shared/view/components';
import { Request } from 'shared/view/elements/Icons';

import RequestWithdrawForm from '../RequestWithdrawForm/RequestWithdrawForm';
import { StylesProps, provideStyles } from './RequestWithdrawButton.style';
import { useModalOpenHandlers } from 'shared/helpers/useModalOpenHandlers';

const tKeys = tKeysAll.features.requestWithdraw;

type IProps = StylesProps;

function RequestWithdrawButton(props: IProps) {
  const { classes } = props;
  const [isOpened, setIsOpened] = React.useState(false);
  const [error, setError] = React.useState('');

  const { t } = useTranslate();

  const { closeModal, openModal, closeErrorModal, onRetry, onError } = useModalOpenHandlers(setIsOpened, setError);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={openModal}>
        <Request className={classes.buttonIcon} />
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

export default provideStyles(RequestWithdrawButton);
