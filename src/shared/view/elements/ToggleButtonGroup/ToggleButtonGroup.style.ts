import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    overflow: 'unset',
    boxShadow: 'unset',
    display: 'flex',
    position: 'relative',
    borderRadius: 0,
    backgroundColor: 'unset',

    '&$outlined::after': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '0px',
      content: '""',
      borderBottom: `solid ${theme.colors.athensGray} 2px`,
    },

  }),
  selected: rule({

  }),

  outlined: {},
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
