import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (_theme: Theme) => ({
  root: rule({
    height: '100%',
    overflow: 'hidden', // https://github.com/mui-org/material-ui/issues/7466
  }),

  container: rule({
    flexGrow: 1,
    minHeight: '100%',
  }),

  header: rule({
    width: '100%',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
