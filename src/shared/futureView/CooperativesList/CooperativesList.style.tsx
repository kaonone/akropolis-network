import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';
import { theme as extraTheme } from 'shared/styles/theme';

const bottomBorder = `0px 1px 0px rgba(0, 0, 0, 0.1)`;
const activeBorder = `-3px 0px 0px -1px ${extraTheme.colors.royalPurple}`;
const hoverBorder = `0 0 0 1px ${extraTheme.colors.coldPurple}`;

const styles = ({ extra: theme }: Theme) => ({
  row: rule({
    boxShadow: bottomBorder,
    borderRadius: '0.25rem',
    background: theme.colors.white,
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    cursor: 'pointer',

    '&$active': {
      boxShadow: `${bottomBorder}, ${activeBorder}`,
    },

    '&:hover': {
      boxShadow: `${hoverBorder}, ${bottomBorder}`,
    },

    '&$active&:hover': {
      boxShadow: `${hoverBorder}, ${bottomBorder}, ${activeBorder}`,
    },
  }),

  active: {},

  cell: rule({

    padding: '1rem',
    fontSize: '1rem',

    '&:first-child': {
      borderTopLeftRadius: '0.25rem',
      borderBottomLeftRadius: '0.25rem',
    },

    '&:last-child': {
      borderTopRightRadius: '0.25rem',
      borderBottomRightRadius: '0.25rem',
    },

  }),

  complexCell: rule({
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  }),

  complexCellTitle: rule({
    color: theme.colors.topaz,
    fontSize: '0.75rem',
    marginBottom: '0.25rem',
  }),

  complexCellValue: rule({
    fontSize: '1rem',
  }),

  avatar: rule({
    background: theme.colors.whiteLilac,
    color: theme.colors.royalPurple,
    fontWeight: 500,
    fontSize: '0.875rem',
  }),

  goal: rule({
    display: '-webkit-box',
    lineHeight: '1.25rem',
    maxHeight: '2.5rem',
    maxWidth: '17.5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 2,
    boxOrient: 'vertical',
    color: theme.colors.topaz,
  }),

  eventIcon: rule({
    width: '1rem',
  }),

  newEvent: rule({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0.25rem 0.5rem 0.25rem 0.75rem',
    borderRadius: '2.125rem',
    background: theme.colors.whiteLilac,
  }),

  eventTag: rule({
    fontSize: '0.625rem',
    color: theme.colors.royalPurple,
    fontWeight: 500,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
