import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
  }),

  text: rule({
    display: 'block',
    color: theme.colors.topaz,
  }),

  title: rule({
    composes: '$text',
    marginBottom: theme.spacing.unit * 3,
  }),

  description: rule({
    composes: '$text',
    marginBottom: theme.spacing.unit * 4,
  }),

  progress: rule({
    width: '12.5rem',
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
