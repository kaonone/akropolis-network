import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  arrowIcon: rule({
    verticalAlign: 'text-bottom',
    fontSize: '1.1em',
  }),

  increase: rule({
    color: theme.colors.shamrock,
  }),

  decrease: rule({
    color: theme.colors.geraldine,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
