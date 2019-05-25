import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    position: 'relative',
    borderRadius: '0.25rem',
    padding: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 3.5,
    backgroundColor: theme.colors.whiteWine,
  }),

  progress: rule({
    width: '2.875rem',
    height: '2.875rem',
    marginRight: theme.spacing.unit * 2,
  }),

  title: rule({
    marginBottom: theme.spacing.unit * 0.5,
    color: theme.colors.topaz,
    lineHeight: '1rem',
  }),

  subTitle: rule({
    lineHeight: '1.25rem',
  }),

  hintIcon: rule({
    position: 'absolute',
    width: '1.125rem',
    right: theme.spacing.unit * 0.75,
    top: theme.spacing.unit * 0.75,
    color: theme.colors.coldPurple,
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
