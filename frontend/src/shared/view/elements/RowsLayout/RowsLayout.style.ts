import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (_theme: Theme) => ({
  root: rule({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    overflow: 'hidden', // https://github.com/mui-org/material-ui/issues/7466
  }),

  container: rule({
    flexGrow: 1,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
