import * as React from 'react';
import * as cn from 'classnames';
import MuiTypography, { TypographyProps } from '@material-ui/core/Typography';
import { SubSet } from '_helpers';

import { StylesProps, provideStyles } from './Typography.style';

type Variant = 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'caption' | 'overline';

interface IOwnProps {
  weight?: 'normal' | 'medium' | 'bold';
  variant?: SubSet<TypographyProps['variant'], Variant>;
}

type IProps = IOwnProps & StylesProps & TypographyProps;

function Typography(props: IProps) {
  const { classes, weight } = props;
  return (
    <MuiTypography
      {...props}
      classes={{
        root: cn(classes.root, { [classes.medium]: weight === 'medium', [classes.bold]: weight === 'bold' }),
      }}
    />
  );
}

export default provideStyles(Typography);
