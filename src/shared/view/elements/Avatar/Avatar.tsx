import * as React from 'react';
import MuiAvatar, { AvatarProps } from '@material-ui/core/Avatar';

function Avatar(props: AvatarProps) {
  return (
    <MuiAvatar {...props} />
  );
}

export default Avatar;
