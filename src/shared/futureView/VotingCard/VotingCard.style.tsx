import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    borderRadius: '0.25rem',
    backgroundColor: theme.colors.white,
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
  }),

  rootChild: rule({
    flexBasis: '100%',
    padding: theme.spacing.unit * 2,
  }),

  mainInformation: rule({
    composes: '$rootChild',
    paddingRight: theme.spacing.unit * 7,
    minWidth: 0, // need for fix flex box behavior with children that has whiteSpace: 'nowrap'
  }),

  metrics: rule({
    marginBottom: theme.spacing.unit * 2.5,
  }),

  title: rule({

    '&$purple': {
      color: theme.colors.royalPurple,
    },

    '&$grey': {
      color: theme.colors.topaz,
    },

  }),

  value: rule({
    composes: '$title',
  }),

  addressTo: rule({
    alignSelf: 'flex-start',
    borderBottom: 'dotted 1px black',
  }),

  subValue: rule({
    marginLeft: theme.spacing.unit * 0.5,
    color: theme.colors.frenchGray,
  }),

  purple: {},
  grey: {},

  voting: rule({
    composes: '$rootChild',
    borderLeft: `solid ${theme.colors.athensGray} 1px`,
    maxWidth: '15.75rem',
  }),

  votingProgress: rule({
    marginBottom: theme.spacing.unit * 2,
  }),

  votingButton: rule({
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 5}px`,
  }),

  toggleExpandIcon: rule({
    marginRight: theme.spacing.unit,
    color: theme.colors.royalPurple,
    cursor: 'pointer',
  }),

  reason: rule({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: theme.colors.topaz,

    '&$expanded': {
      whiteSpace: 'unset',
    },
  }),

  reasonFirstWord: rule({
    color: theme.colors.royalPurple,
  }),

  expanded: {},

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
