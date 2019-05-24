import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

import { Button } from 'shared/view/elements';

import { ErrorModal, Modal } from 'shared/view/components';
import { Exit } from 'shared/view/elements/Icons';

import JoinToCooperativeForm from '../JoinToCooperativeForm/JoinToCooperativeForm';
import { StylesProps, provideStyles } from './JoinToCooperativeButton.style';

const tKeys = tKeysAll.features.joinToCooperative;

function JoinToCooperativeButton(props: StylesProps) {
  const { classes } = props;
  const { t } = useTranslate();
  const [isOpened, setIsOpened] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const handleIsOpenedChanging = React.useCallback((opened: boolean) => {
    setIsOpened(opened);
  }, []);

  const closeModal = handleIsOpenedChanging.bind(null, false);

  const handleErrorChanging = React.useCallback((withError: boolean) => {
    setHasError(withError);
  }, []);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleIsOpenedChanging.bind(null, true)}>
        <Exit className={classes.buttonIcon} />
        {t(tKeys.button.getKey())}
      </Button>
      {!hasError && (
        <Modal
          size="large"
          isOpen={isOpened}
          title={t(tKeys.form.title.getKey())}
          onClose={closeModal}
        >
          <JoinToCooperativeForm
            onSuccess={closeModal}
            onError={handleErrorChanging.bind(null, true)}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {!!hasError && (
        <ErrorModal
          isOpened={isOpened}
          onClose={closeModal}
          onRetry={handleErrorChanging.bind(null, false)}
        />
      )}
    </>
  );
}

export default provideStyles(JoinToCooperativeButton);
