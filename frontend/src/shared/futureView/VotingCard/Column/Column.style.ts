import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({

  }),

  title: rule({
    color: theme.colors.topaz,

    '&$isHighlighted': {
      color: theme.colors.royalPurple,
    },
  }),

  value: rule({
    color: theme.colors.haiti,

    '&$isHighlighted': {
      color: theme.colors.royalPurple,
    },
  }),

  subValue: rule({
    marginLeft: theme.spacing.unit * 0.5,
    color: theme.colors.frenchGray,
  }),

  isHighlighted: rule({}),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
