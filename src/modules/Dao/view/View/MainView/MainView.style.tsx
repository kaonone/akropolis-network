import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
  }),

  section: rule({
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 5.5,
  }),

  headerButtonIcon: rule({
    marginRight: theme.spacing.unit,
  }),

  sectionLink: rule({
    '&:last-child': {
      marginLeft: 'auto',
    },
  }),

  withBadge: rule({
    padding: `0 ${theme.spacing.unit * 2}px`,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
