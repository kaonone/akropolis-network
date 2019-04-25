import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  root: rule({

  }),
  nameInput: rule({
    display: 'flex',
    alignItems: 'center',
  }),
  nameIcon: rule({
    marginLeft: theme.spacing.unit * 2,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
