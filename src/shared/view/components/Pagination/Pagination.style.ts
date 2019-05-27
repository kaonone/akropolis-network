import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2.5}px`,
    borderRadius: '0.25rem',
    backgroundColor: theme.colors.white,
  }),

  toggleIcon: rule({
    width: '0.875rem',
    height: '0.875rem',
    color: theme.colors.haiti,
    cursor: 'pointer',

    '&$disabled': {
      color: theme.colors.topaz,
    },
  }),

  toggleBack: rule({
    transform: 'rotate(180deg)',
  }),

  disabled: {},

  text: rule({
    color: theme.colors.topaz,
  }),

  itemsPerPage: rule({
    composes: '$text',
    marginRight: theme.spacing.unit,
  }),

  currentItems: rule({
    composes: '$text',
  }),

  select: rule({
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '0.75rem',
    color: theme.colors.topaz,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
