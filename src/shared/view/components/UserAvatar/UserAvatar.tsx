import * as React from 'react';

import { Avatar, Typography } from 'shared/view/elements';

import { provideStyles, StylesProps } from './UserAvatar.style';
import getIdenticonSrc from 'shared/helpers/getIdenticonSrc';

interface IOwnProps {
  address: string;
  className?: string;
}

type IProps = IOwnProps & StylesProps;

class UserAvatar extends React.Component<IProps> {
  public render() {
    const {
      classes, address, className,
    } = this.props;

    return (
      <div className={classes.root}>
        <Avatar src={getIdenticonSrc(address)} className={classes.avatar} />
        <Typography variant="body2" className={className}>{address}</Typography>
     </div>
    );
  }
}

export { IProps };
export default provideStyles(UserAvatar);
