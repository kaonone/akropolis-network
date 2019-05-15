import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function AddPerson(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.99967 7.9999C11.473 7.9999 12.6663 6.80656 12.6663 5.33323C12.6663 3.8599 11.473 2.66656 9.99967 2.66656C8.52634 2.66656 7.33301 3.8599 7.33301 5.33323C7.33301 6.80656 8.52634 7.9999 9.99967 7.9999ZM3.99984 6.66656V4.66656L2.6665 4.66656L2.6665 6.66656H0.666504L0.666504 7.9999H2.6665V9.9999H3.99984L3.99984 7.9999H5.99984V6.66656H3.99984ZM9.99984 9.33319C8.21984 9.33319 4.6665 10.2265 4.6665 11.9999V13.3332L15.3332 13.3332V11.9999C15.3332 10.2265 11.7798 9.33319 9.99984 9.33319Z" fill="currentColor" />

    </SvgIcon>
  );
}

export default AddPerson;
