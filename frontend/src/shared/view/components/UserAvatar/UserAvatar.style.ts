import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    display: 'flex',
    alignItems: 'center',
  }),

  avatar: rule({
    width: '1.5rem',
    height: '1.5rem',
    marginRight: theme.spacing.unit,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
