import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => {
  const graphicMarginBottom = theme.spacing.unit * 3;
  const switchButtonsHeight = 40;
  const graphicHeight = `calc(100% - ${graphicMarginBottom}px - ${switchButtonsHeight}px)`;

  return {
    root: rule({
      height: '100%',
    }),

    graphic: rule({
      height: graphicHeight,
      marginBottom: graphicMarginBottom,
    }),

    switchButton: rule({
      minWidth: 'unset',
      minHeight: 'unset',
      padding: '0.1875rem 0.6875rem',
      fontSize: '0.625rem',
    }),

    tick: rule({
      fill: theme.colors.frenchGray,
      fontSize: '0.625rem',
      fontFamily: theme.typography.primaryFont,
      fontWeight: 500,
      textTransform: 'uppercase',
    }),
  };
};

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
