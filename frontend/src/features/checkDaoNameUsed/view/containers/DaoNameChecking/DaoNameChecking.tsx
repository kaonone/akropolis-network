import * as React from 'react';

import { useCheckDaoNameAvailability } from 'services/checkDaoName';
import { useTranslate } from 'services/i18n';

import { TextInput, CircleProgressBar, Button, Grid } from 'shared/view/elements';
import { useDebounce, useValidation } from 'shared/helpers/react';
import { maxStringLength, allowedCharactersForDaoName } from 'shared/validators';

import { StylesProps, provideStyles } from './DaoNameChecking.style';

interface IProps {
  checkOf: 'used' | 'unused';
  disabled?: boolean;
  negativeCheckingDescription?: string;
  actionButtonText: string;
  actionIsInProgress?: boolean;
  onActionClick(daoName: string): void;
}

const validateMaxLength = maxStringLength.bind(null, 30);

function DaoNameChecking(props: IProps & StylesProps) {
  const {
    classes, onActionClick, negativeCheckingDescription, actionButtonText, checkOf, disabled, actionIsInProgress,
  } = props;
  const { t } = useTranslate();

  const [daoName, setDaoName] = React.useState('');
  const daoNameFormatError = useValidation(daoName, [validateMaxLength, allowedCharactersForDaoName]);
  const [debouncedDaoName] = useDebounce(daoName, 400);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDaoName(event.target.value);
  }, []);
  const handleActionClick = React.useCallback(() => {
    onActionClick(daoName);
  }, [daoName, onActionClick]);

  const nameChecking = useCheckDaoNameAvailability(debouncedDaoName);

  const checkingPositiveResult = checkOf === 'used' ? !nameChecking.isAvailable : nameChecking.isAvailable;

  const isPositive = nameChecking.checkedDomain === daoName && daoName && checkingPositiveResult;
  const isNegative = nameChecking.checkedDomain === daoName && daoName && !checkingPositiveResult;
  const helperText: string = (
    daoNameFormatError && t(daoNameFormatError) ||
    isNegative && negativeCheckingDescription || ''
  );

  return (
    <Grid container spacing={16} className={classes.root}>
      <Grid item xs={12}>
        <div className={classes.nameInput}>
          <TextInput
            disabled={disabled}
            variant="outlined"
            value={daoName}
            onChange={handleChange}
            helperText={helperText}
            label="Co-op name"
          />
          <div className={classes.nameIcon}>
            {nameChecking.checkedDomain !== daoName && <CircleProgressBar size={24} />}
            {isPositive && 'Ok'}
            {isNegative && 'Not Ok'}
          </div>
        </div>
      </Grid>
      {isPositive && (
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleActionClick} disabled={disabled}>
            {actionButtonText}
            {actionIsInProgress && <CircleProgressBar size={16} classes={{ root: classes.actionPreloader }} />}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default provideStyles(DaoNameChecking);
