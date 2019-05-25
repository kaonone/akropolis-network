import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  rootRowsLayout: rule({
    width: theme.extra.sizes.page.maxWidth,
    margin: '0 auto',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
