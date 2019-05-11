import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function NewEvent(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0009 7.33335C12.0009 5.28669 10.9076 3.57335 9.00094 3.12002V2.66669C9.00094 2.11335 8.55427 1.66669 8.00094 1.66669C7.4476 1.66669 7.00094 2.11335 7.00094 2.66669V3.12002C5.0876 3.57335 4.00094 5.28002 4.00094 7.33335V10.6667L2.6676 12V12.6667H13.3343V12L12.0009 10.6667V7.33335ZM8.00174 14.6667C8.09508 14.6667 8.18174 14.66 8.26841 14.64C8.70174 14.5467 9.05508 14.2534 9.22841 13.8534C9.29508 13.6934 9.32841 13.52 9.32841 13.3334H6.66174C6.66841 14.0667 7.26174 14.6667 8.00174 14.6667Z" fill="#613AAF" />
    </SvgIcon>
  );
}

export default NewEvent;
