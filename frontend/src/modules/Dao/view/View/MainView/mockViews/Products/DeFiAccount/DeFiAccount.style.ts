import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    border: `1px solid ${theme.colors.ghostGray}`,
    borderRadius: 4,
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
    color: theme.colors.mulledWine,
    background: theme.colors.white,
  }),

  actionsCard: rule({
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    borderRadius: 4,
    background: theme.colors.whiteWine,
    color: theme.colors.topaz,
  }),

  description: rule({
    color: theme.colors.topaz,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
