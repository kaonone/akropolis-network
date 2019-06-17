import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  root: rule({
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    border: `1px solid ${theme.extra.colors.ghostGray}`,
    borderRadius: 4,
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
    color: theme.extra.colors.mulledWine,
    background: theme.extra.colors.white,
  }),

  actionsCard: rule({
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    borderRadius: 4,
    background: theme.extra.colors.whiteWine,
    color: theme.extra.colors.topaz,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
