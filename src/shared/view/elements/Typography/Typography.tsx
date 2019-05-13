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
        h3: classes.h3,
        h4: classes.h4,
        h5: classes.h5,
        h6: classes.h6,
        body1: classes.body1,
        body2: classes.body2,
        subtitle1: classes.subtitle1,
        caption: classes.caption,
        overline: classes.overline,
      }}
    />
  );
}

export default provideStyles(Typography);
