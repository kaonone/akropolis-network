import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  stages: rule({
    background: theme.extra.colors.ghostWhite,
    borderRadius: 4,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 7}px`,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
