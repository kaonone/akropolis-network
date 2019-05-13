import { withStyles as muiWithStyles } from '@material-ui/core/styles';
import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    '&$grey': {
      backgroundColor: theme.colors.martinique,
      color: theme.colors.white,
    },

    '&$purple': {
      backgroundColor: theme.colors.royalPurple,
      color: theme.colors.white,
    },

    '&:hover': {
      '&$grey': {
        backgroundColor: theme.colors.mulledWine,
      },

      '&$purple': {
        backgroundColor: theme.colors.daisyBush,
      },
    },
  }),
  grey: {},
  purple: {},

});

export const provideStyles = (muiWithStyles as typeof withStyles)(styles);

export type StylesProps = WithStyles<typeof styles>;
