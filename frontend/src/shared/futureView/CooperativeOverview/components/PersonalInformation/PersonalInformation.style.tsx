import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({}),

  title: rule({
    marginBottom: theme.spacing.unit * 3,
    color: theme.colors.topaz,
  }),

  metricRow: rule({
    marginBottom: theme.spacing.unit * 2,
  }),

  subTitle: rule({
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1.75',
    color: theme.colors.topaz,
  }),

  accessCards: rule({
    '& > :not(:last-child)': {
      marginBottom: theme.spacing.unit,
    },
  }),

  hintIcon: rule({
    fontSize: '1.7em',
    marginLeft: theme.spacing.unit,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
