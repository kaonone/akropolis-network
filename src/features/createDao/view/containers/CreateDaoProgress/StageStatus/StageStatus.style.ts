import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  gray: rule({
    color: theme.extra.colors.topaz,
  }),

  positive: rule({
    color: theme.extra.colors.shamrock,
  }),

  waiting: rule({
    color: theme.extra.colors.royalPurple,
  }),

  icon: rule({
    display: 'flex',
    fontSize: theme.spacing.unit * 5,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
