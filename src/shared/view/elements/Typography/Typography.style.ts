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

  h3: rule({
    fontSize: '48px',
  }),

  h4: rule({
    fontSize: '36px',
  }),

  h5: rule({
    fontSize: '28px',
  }),

  h6: rule({
    fontSize: '20px',
  }),

  body1: rule({
    fontSize: '16px',
  }),

  body2: rule({
    fontSize: '14px',
  }),

  subtitle1: rule({
    fontSize: '12px',
  }),

  caption: rule({
    fontSize: '10px',
  }),

  overline: rule({
    fontSize: '10px',
  }),

  medium: {},
  bold: {},

});

// TODO ds: rewrite after transition to @material-ui/styles
export const provideStyles = (muiWithStyles as typeof withStyles)(styles);

export type StylesProps = WithStyles<typeof styles>;
