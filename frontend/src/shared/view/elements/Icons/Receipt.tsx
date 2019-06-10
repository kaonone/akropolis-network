import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Receipt(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.8 11.3333H4V9.99994H8.8V11.3333ZM12 8.66652H4V7.33319H12V8.66652ZM12 6.00002H4V4.66669H12V6.00002ZM2 14.6665L3 13.6665L4 14.6665L5 13.6665L6 14.6665L7 13.6665L8 14.6665L9 13.6665L10 14.6665L11 13.6665L12 14.6665L13 13.6665L14 14.6665V1.33319L13 2.33319L12 1.33319L11 2.33319L10 1.33319L9 2.33319L8 1.33319L7 2.33319L6 1.33319L5 2.33319L4 1.33319L3 2.33319L2 1.33319V14.6665Z" fill="currentColor" />
    </SvgIcon>
  );
}

export default Receipt;
