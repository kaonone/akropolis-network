import * as React from 'react';

import { useCheckDaoNameAvailability } from 'services/checkDaoName';
import { useTranslate } from 'services/i18n';

import { TextInput, CircleProgressBar, Button, Grid } from 'shared/view/elements';
import { useDebounce, useValidation } from 'shared/helpers/react';
import { maxStringLength, allowedCharactersForDaoName } from 'shared/validators';

import { StylesProps, provideStyles } from './OpenDao.style';

interface IProps {
  onOpenDao(daoName: string): void;
}

const validateMaxLength = maxStringLength.bind(null, 30);

function OpenDao(props: IProps & StylesProps) {
  const { classes, onOpenDao } = props;
  const { t } = useTranslate();

  const [daoName, setDaoName] = React.useState('');
  const daoNameFormatError = useValidation(daoName, [validateMaxLength, allowedCharactersForDaoName]);
  const [debouncedDaoName] = useDebounce(daoName, 400);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDaoName(event.target.value);
  }, []);
  const handleOpen = React.useCallback(() => {
    onOpenDao(daoName);
  }, [daoName, onOpenDao]);

  const nameChecking = useCheckDaoNameAvailability(debouncedDaoName);

  const isFoundDao = nameChecking.checkedDomain === daoName && daoName && !nameChecking.isAvailable;
  const isNotFoundDao = nameChecking.checkedDomain === daoName && daoName && nameChecking.isAvailable;
  const helperText: string = (
    daoNameFormatError && t(daoNameFormatError) ||
    isNotFoundDao && 'No organization with that name exists.' || ''
  );

  return (
    <Grid container spacing={16} className={classes.root}>
      <Grid item xs={12}>
        <div className={classes.nameInput}>
          <TextInput
            variant="outlined"
            value={daoName}
            onChange={handleChange}
            helperText={helperText}
          />
          <div className={classes.nameIcon}>
            {nameChecking.checkedDomain !== daoName && <CircleProgressBar size={24} />}
            {isFoundDao && 'Ok'}
            {isNotFoundDao && 'Not Ok'}
          </div>
        </div>
      </Grid>
      {isFoundDao && (
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleOpen}>Open co-op</Button>
        </Grid>
      )}
    </Grid>
  );
}

export default provideStyles(OpenDao);
