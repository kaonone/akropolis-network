import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    borderRadius: '0.25rem',
    backgroundColor: theme.colors.white,
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
  }),

  mainInformation: rule({
    padding: theme.spacing.unit * 2,
  }),

  metrics: rule({
    marginBottom: theme.spacing.unit * 2.5,
    marginRight: '1.5rem',
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

  address: rule({
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
    borderLeft: `solid ${theme.colors.athensGray} 1px`,
    padding: theme.spacing.unit * 2,
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

  votingDecision: rule({
    padding: theme.spacing.unit,
    borderRadius: '0.25rem',
    backgroundColor: theme.colors.ghostWhite,
  }),

  votingIcon: rule({
    width: '1.25rem',
    marginRight: theme.spacing.unit * 0.5,
  }),

  votingForIcon: rule({
    composes: '$votingIcon',
    color: theme.colors.shamrock,
  }),

  votingAgainstIcon: rule({
    composes: '$votingIcon',
    color: theme.colors.geraldine,
  }),

  votingTypeIcon: rule({
    fontSize: '1rem',
    marginRight: theme.spacing.unit,
  }),

  withdrawIcon: rule({
    composes: '$votingTypeIcon',
    color: theme.colors.jaffa,
  }),

  addPersonIcon: rule({
    composes: '$votingTypeIcon',
    color: theme.colors.curiousBlue,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
