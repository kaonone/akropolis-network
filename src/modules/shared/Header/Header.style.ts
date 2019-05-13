import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    padding: `${theme.spacing.unit * 3.5}px ${theme.spacing.unit * 3}px`,
    background: 'linear-gradient(360deg, #7357D2 0%, #8E41DC 100%)', // TODO ds: take from theme
    borderRadius: 4,
  }),

  backButton: rule({
    color: '#fff',
  }),

  title: rule({
    color: '#fff',
    fontWeight: 'bold',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
