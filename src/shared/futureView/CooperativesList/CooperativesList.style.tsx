import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';
import { theme as extraTheme } from 'shared/styles/theme';

const bottomBorder = `0px 1px 0px rgba(0, 0, 0, 0.1)`;
const activeBorder = `-3px 0px 0px -1px ${extraTheme.colors.royalPurple}`;
const hoverBorder = `0 0 0 1px ${extraTheme.colors.coldPurple}`;

const styles = ({ extra: theme }: Theme) => ({
  row: rule({
    boxShadow: bottomBorder,
    borderRadius: '4px',
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

    padding: '16px',
    fontSize: '16px',

    '&:first-child': {
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
    },

    '&:last-child': {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
    },

  }),

  complexCell: rule({
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  }),

  complexCellTitle: rule({
    color: theme.colors.topaz,
    fontSize: '12px',
    marginBottom: '4px',
  }),

  complexCellValue: rule({
    fontSize: '16px',
  }),

  avatar: rule({
    background: theme.colors.whiteLilac,
    color: theme.colors.royalPurple,
    fontWeight: 500,
    fontSize: '14px',
  }),

  goal: rule({
    display: '-webkit-box',
    lineHeight: '20px',
    maxHeight: '40px',
    maxWidth: '280px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 2,
    boxOrient: 'vertical',
    color: theme.colors.topaz,
  }),

  eventIcon: rule({
    width: '16px',
  }),

  newEvent: rule({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '4px 8px 4px 12px',
    borderRadius: '34px',
    background: theme.colors.whiteLilac,
  }),

  eventTag: rule({
    fontSize: '10px',
    color: theme.colors.royalPurple,
    fontWeight: 500,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
