import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Request(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.354 3.60354C10.1587 3.40828 9.84212 3.40828 9.64686 3.60354L7.51254 5.73785C7.32355 5.92684 7.4574 6.24999 7.72467 6.24999L9.25041 6.24999L9.25041 13H10.7504L10.7504 6.24998H12.2761C12.5434 6.24998 12.6773 5.92684 12.4883 5.73785L10.354 3.60354Z" fill="#613AAF" />
      <path opacity="0.8" fillRule="evenodd" clipRule="evenodd" d="M16.75 3.25H13.6812C13.4477 3.25 13.3038 3.50497 13.4243 3.70492L14.05 4.7425H16.75V15.265H3.25V4.7425H5.95L6.57568 3.70492C6.69625 3.50497 6.55226 3.25 6.31877 3.25H3.25C2.425 3.25 1.75 3.925 1.75 4.75V15.25C1.75 16.075 2.425 16.75 3.25 16.75H16.75C17.575 16.75 18.25 16.075 18.25 15.25V4.75C18.25 3.925 17.575 3.25 16.75 3.25Z" fill="#613AAF" />
    </SvgIcon>
  );
}

export default Request;
