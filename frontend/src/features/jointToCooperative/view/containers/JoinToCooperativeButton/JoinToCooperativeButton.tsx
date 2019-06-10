import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

import { Button } from 'shared/view/elements';
import { Exit } from 'shared/view/elements/Icons';
import { ErrorModal, Modal } from 'shared/view/components';
import { useModalHandlers } from 'shared/helpers/useModalHandlers';

import JoinToCooperativeForm from '../JoinToCooperativeForm/JoinToCooperativeForm';
import { StylesProps, provideStyles } from './JoinToCooperativeButton.style';

const tKeys = tKeysAll.features.joinToCooperative;

type IProps = StylesProps;

function JoinToCooperativeButton(props: IProps) {
  const { classes } = props;
  const { t } = useTranslate();

  const { isOpened, error, closeModal, openModal, closeErrorModal, onRetry, onError } = useModalHandlers();

  return (
    <>
      <Button variant="contained" color="secondary" onClick={openModal}>
        <Exit className={classes.buttonIcon} />
        {t(tKeys.button.getKey())}
      </Button>
      <Modal
        size="large"
        isOpen={isOpened && !error}
        title={t(tKeys.form.title.getKey())}
        onClose={closeModal}
      >
        <JoinToCooperativeForm
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

export default provideStyles(JoinToCooperativeButton);
