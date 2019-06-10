import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => (
  {
    buttonIcon: rule({
      marginRight: theme.spacing.unit,
    }),
    hint: rule({
      padding: theme.spacing.unit * 2,
      borderRadius: '0.25rem',
      backgroundColor: theme.colors.whiteLilac,
    }),
  });

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
