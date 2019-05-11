import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Deposit(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path opacity="0.8" fillRule="evenodd" clipRule="evenodd" d="M16.75 3.25H12.75C12.4739 3.25 12.25 3.47386 12.25 3.75V4.2425C12.25 4.51864 12.4739 4.7425 12.75 4.7425H16.75V15.265H3.25V4.7425H7.25C7.52614 4.7425 7.75 4.51864 7.75 4.2425V3.75C7.75 3.47386 7.52614 3.25 7.25 3.25H3.25C2.425 3.25 1.75 3.925 1.75 4.75V15.25C1.75 16.075 2.425 16.75 3.25 16.75H16.75C17.575 16.75 18.25 16.075 18.25 15.25V4.75C18.25 3.925 17.575 3.25 16.75 3.25Z" fill="#613AAF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.64747 12.6464C9.84273 12.8416 10.1593 12.8416 10.3546 12.6464L12.4889 10.5121C12.6779 10.3231 12.544 9.99994 12.2768 9.99994H10.751V3.74994C10.751 3.4738 10.5272 3.24994 10.251 3.24994H9.75102C9.47488 3.24994 9.25102 3.4738 9.25102 3.74994V9.99994H7.72528C7.45801 9.99994 7.32416 10.3231 7.51315 10.5121L9.64747 12.6464Z" fill="#613AAF" />

    </SvgIcon>
  );
}

export default Deposit;
