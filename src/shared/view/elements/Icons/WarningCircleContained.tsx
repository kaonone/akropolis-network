import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function WarningCircleContained(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 28 28">
      <path fillRule="evenodd" clipRule="evenodd" d="M14 .667C6.64.667.667 6.64.667 14S6.64 27.333 14 27.333 27.333 21.36 27.333 14 21.36.667 14 .667zm1.333 20h-2.666V18h2.666v2.667zm0-5.334h-2.666v-8h2.666v8z" fill="currentColor"/>
    </SvgIcon>
  );
}

export default WarningCircleContained;
