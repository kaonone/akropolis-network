import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
  }),

  section: rule({
    overflow: 'hidden',
    height: '100%',
    border: `1px solid ${theme.colors.athensGray}`,
    borderRadius: '0.25rem',
    backgroundColor: theme.colors.white,
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing.unit * 2,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
