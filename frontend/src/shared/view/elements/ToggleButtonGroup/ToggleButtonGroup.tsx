import * as React from 'react';
import * as cn from 'classnames';
import { Omit } from '_helpers';
import MuiToggleButtonGroup, { ToggleButtonGroupProps } from '@material-ui/lab/ToggleButtonGroup';

import { StylesProps, provideStyles } from './ToggleButtonGroup.style';

type IProps = Omit<ToggleButtonGroupProps, 'classes'> & StylesProps & {
  nullable?: false;
  variant?: 'outlined',
};

class ToggleButtonGroup extends React.Component<IProps> {
  public render() {
    const { classes, variant } = this.props;
    return (
      <MuiToggleButtonGroup
        {...normalizeProps(this.props)}
        onChange={this.onChange}
        classes={{
          root: cn(classes.root, { [classes.outlined]: variant === 'outlined' || !variant }),
        }}
      />
    );
  }

  private onChange: ToggleButtonGroupProps['onChange'] = (event, value) => {
    const { onChange, nullable = true } = this.props;

    (value || nullable) && onChange && onChange(event, value);
  }
}

function normalizeProps(props: IProps): ToggleButtonGroupProps {
  const { theme, nullable, classes, variant, ...rest } = props;

  return rest;
}

export default provideStyles(ToggleButtonGroup);
