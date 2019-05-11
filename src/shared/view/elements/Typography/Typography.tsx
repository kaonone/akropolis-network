import * as React from 'react';
import * as cn from 'classnames';
import MuiTypography, { TypographyProps } from '@material-ui/core/Typography';

import { StylesProps, provideStyles } from './Typography.style';

interface IOwnProps {
  weight?: 'normal' | 'medium' | 'bold';
}
type IProps = IOwnProps & TypographyProps & StylesProps;

function Typography(props: IProps) {
  const { classes, weight } = props;
  return (
    <MuiTypography
      color="primary"
      className={cn({ [classes.medium]: weight === 'medium', [classes.bold]: weight === 'bold' })}
      {...props}
      classes={{
        root: classes.root,
        h3: classes.h3,
        h4: classes.h4,
        h5: classes.h5,
        h6: classes.h6,
      }}
    />
  );
}

export default provideStyles(Typography);
