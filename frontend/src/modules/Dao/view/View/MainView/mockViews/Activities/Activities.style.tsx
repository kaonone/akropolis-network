import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
  }),

  activities: rule({
    '& > *': {
      marginBottom: theme.spacing.unit,
    },
  }),

  pagination: rule({
    marginBottom: theme.spacing.unit * 2,
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
