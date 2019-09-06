import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    padding: `${theme.spacing.unit * 3.5}px ${theme.spacing.unit * 3}px`,
    background: theme.gradients.purple,
    borderRadius: 4,
  }),

  iconButton: rule({
    color: '#fff',
  }),

  accountIcon: rule({
    padding: 5.5,
  }),

  title: rule({
    color: '#fff',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
