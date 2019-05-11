import { withStyles as muiWithStyles } from '@material-ui/core/styles';
import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({

  root: rule({
    color: theme.palette.text.primary,

    '&$medium': {
      fontWeight: 500,
    },

    '&$bold': {
      fontWeight: 'bold',
    },
  }),

  h3: rule({
    fontSize: '3rem',
  }),

  h4: rule({
    fontSize: '2.25rem',
  }),

  h5: rule({
    fontSize: '1.75rem',
  }),

  h6: rule({
    fontSize: '1.25rem',
  }),

  medium: {},
  bold: {},

});

// TODO ds: rewrite after transition to @material-ui/styles
export const provideStyles = (muiWithStyles as typeof withStyles)(styles);

export type StylesProps = WithStyles<typeof styles>;
