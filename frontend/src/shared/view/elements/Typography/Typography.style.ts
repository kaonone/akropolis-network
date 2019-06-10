import { withStyles as muiWithStyles } from '@material-ui/core/styles';
import { withStyles, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = () => ({

  root: rule({
    '&$medium': {
      fontWeight: 500,
    },

    '&$bold': {
      fontWeight: 'bold',
    },
  }),

  medium: {},
  bold: {},

});

// TODO ds: rewrite after transition to @material-ui/styles
export const provideStyles = (muiWithStyles as typeof withStyles)(styles);

export type StylesProps = WithStyles<typeof styles>;
