import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const bottomBorder = `0px 1px 0px rgba(0, 0, 0, 0.1)`;

const borderRadius = '0.25rem';

const styles = ({ extra: theme }: Theme) => {
  const horizontalCellPadding = theme.spacing.unit * 1.5;

  return {
    row: rule({
      boxShadow: bottomBorder,
      borderRadius,
      background: theme.colors.white,
    }),

    header: rule({
      backgroundColor: '#F4F3F5',
      borderRadius,
    }),

    active: {},

    cell: rule({
      padding: `${theme.spacing.unit * 1.75}px ${horizontalCellPadding}px`,

      '&:first-child': {
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
      },

      '&:last-child': {
        paddingRight: theme.spacing.unit * 2,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
      },
    }),

    headerCell: rule({
      composes: '$cell',
      padding: `${theme.spacing.unit * 0.75}px ${horizontalCellPadding}px`,
    }),

    headerTitle: rule({
      color: theme.colors.topaz,
    }),

    memberNumber: rule({
      color: theme.colors.topaz,
    }),

    userTag: rule({
      padding: `${theme.spacing.unit * 0.5}px ${theme.spacing.unit}px`,
      borderRadius: '2.125rem',
      background: theme.colors.whiteLilac,
      color: theme.colors.royalPurple,
    }),

    avatar: rule({
      width: '1.5rem',
      height: '1.5rem',
      marginRight: theme.spacing.unit,
    }),
  };
};

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
