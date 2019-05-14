import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    padding: theme.spacing.unit * 5,
    paddingTop: 0,
  }),

  action: rule({
    minWidth: 210,
  }),

  metamaskIcon: rule({
    fontSize: 130,
    position: 'absolute',
    left: '-25px',
    bottom: '-30px',
    opacity: 0.4,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
