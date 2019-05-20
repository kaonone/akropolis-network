import { withStyles, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

import mockCompound from './mockCompound.svg';

const styles = () => ({
  root: rule({
    width: '100%',
    height: '567px',
    backgroundImage: `url(${mockCompound})`,
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
