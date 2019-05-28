import * as React from 'react';
import MuiSelect, { SelectProps } from '@material-ui/core/Select';

function Select(props: SelectProps) {
  return (
    <MuiSelect color="primary" {...props} />
  );
}

export default Select;
