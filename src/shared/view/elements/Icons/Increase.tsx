import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Increase(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.66638 3C6.29819 3 5.99972 3.29848 5.99972 3.66667C5.99972 4.03486 6.29819 4.33333 6.66638 4.33333H10.393L3.13638 11.59C2.87681 11.8496 2.87681 12.2704 3.13638 12.53C3.39596 12.7896 3.81681 12.7896 4.07638 12.53L11.333 5.27333V9C11.333 9.36819 11.6315 9.66667 11.9997 9.66667C12.3679 9.66667 12.6664 9.36819 12.6664 9V4C12.6664 3.44771 12.2187 3 11.6664 3H6.66638Z" fill="currentColor" />
    </SvgIcon>
  );
}

export default Increase;
