import * as React from 'react';

import { useTranslate, tKeys } from 'services/i18n';
import { Modal } from 'shared/view/components';
import { Grid, Button } from 'shared/view/elements';
import { WarningCircleContained } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './ErrorModal.style';

const intl = tKeys.features.createDao;

interface IProps {
  isOpened: boolean;
  onClose(): void;
  onRetry(): void;
}

function ErrorModal(props: IProps & StylesProps) {
  const { classes, isOpened, onClose, onRetry } = props;
  const { t } = useTranslate();
  return (
    <Modal
      size="large"
      isOpen={isOpened}
      title={t(intl.errorTitle.getKey())}
      titleIcon={<WarningCircleContained className={classes.icon} />}
      onClose={onClose}
    >
      <Grid container justify="center">
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="primary" onClick={onRetry}>
            {t(tKeys.shared.retry.getKey())}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default provideStyles(ErrorModal);
