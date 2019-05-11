import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Decrease(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.8636 4.41012C13.1232 4.15055 13.1232 3.7297 12.8636 3.47012C12.604 3.21055 12.1832 3.21055 11.9236 3.47012L4.66695 10.7268V7.00012C4.66695 6.63193 4.36847 6.33346 4.00028 6.33346C3.6321 6.33346 3.33362 6.63193 3.33362 7.00012V12.0001C3.33362 12.5524 3.78133 13.0001 4.33362 13.0001H9.33362C9.70181 13.0001 10.0003 12.7016 10.0003 12.3335C10.0003 11.9653 9.70181 11.6668 9.33362 11.6668H5.60695L12.8636 4.41012Z" fill="#FF7888" />
    </SvgIcon>
  );
}

export default Decrease;
