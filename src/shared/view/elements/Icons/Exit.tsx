import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Exit(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.40833 12.9917L9.58333 14.1667L13.75 10L9.58333 5.83334L8.40833 7.00834L10.5583 9.16668H2.5V10.8333H10.5583L8.40833 12.9917Z" fill="currentColor"/>
      <path opacity="0.65" fillRule="evenodd" clipRule="evenodd" d="M15.8333 2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V7.5H4.16667V4.16667H15.8333V15.8333H4.16667V12.5H2.5V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5Z" fill="currentColor"/>
    </SvgIcon>
  );
}

export default Exit;
