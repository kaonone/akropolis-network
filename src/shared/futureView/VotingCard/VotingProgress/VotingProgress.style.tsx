import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
  }),

  green: {},
  red: {},

  progressBar: rule({
    borderRadius: '0.25rem',
    height: '2.1px', // if specify exactly 2, some time sizes between progresses may be different
    overflow: 'hidden',
    backgroundColor: theme.colors.athensGray,
  }),

  progressBarValue: rule({
    height: '100%',

    '&$red': {
      backgroundColor: theme.colors.geraldine,
    },

    '&$green': {
      backgroundColor: theme.colors.shamrock,
    },

  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
