import * as React from 'react';
import * as cn from 'classnames';
import { SubSet, MergeRight } from '_helpers';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';

import { StylesProps, provideStyles } from './Button.style';

type MuiColor = 'primary' | 'default' | 'secondary';
const muiColors: MuiColor[] = ['primary', 'default', 'secondary'];

type IProps = StylesProps & MergeRight<ButtonProps, {
  color?: SubSet<ButtonProps['color'], MuiColor> | 'grey' | 'purple';
}>;

function Button(props: IProps) {
  const { classes, color, ...rest } = props;

  const buttonColor = color && muiColors.includes(color as MuiColor) ? color as MuiColor : undefined;
  return (
    <MuiButton
      {...rest}
      classes={{ root: cn(classes.root, { [classes.purple]: color === 'purple', [classes.grey]: color === 'grey' }) }}
      color={buttonColor}
    />
  );
}

export default provideStyles(Button);
