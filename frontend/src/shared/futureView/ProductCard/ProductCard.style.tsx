import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    minHeight: '100%',
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.25rem',
    border: `1px solid ${theme.colors.ghostGray}`,
    background: theme.colors.white,
  }),

  header: rule({
    padding: theme.spacing.unit * 2,
    borderBottom: `solid 1px ${theme.colors.athensGray}`,
  }),

  content: rule({
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 1.5,
    color: theme.colors.mulledWine,

    '&$isDisabled': {
      color: theme.colors.topaz,
    },
  }),

  isDisabled: {},

  profit: rule({
    minHeight: '3rem',
  }),

  metrics: rule({
    marginBottom: theme.spacing.unit * 4,
  }),

  title: rule({
    color: theme.colors.topaz,
  }),

  typeBadge: rule({
    padding: '0.125rem 0.375rem',
    marginRight: '0.625rem',
    color: theme.colors.royalPurple,
    backgroundColor: theme.colors.whiteLilac,
    borderRadius: '1.25rem',
    lineHeight: '1rem',
  }),

  icon: rule({
    width: '3rem',
    marginRight: theme.spacing.unit * 2,
  }),

  annualProfit: rule({
    color: 'inherit',
  }),

  footer: rule({
    backgroundColor: theme.colors.whiteWine,
    borderRadius: '0.25rem',
  }),

  waiting: rule({
    composes: '$footer',
    padding: theme.spacing.unit * 1.75,
  }),

  needEnable: rule({
    composes: '$footer',
    padding: theme.spacing.unit * 0.5,
  }),

  actionIcon: rule({
    weight: '1.25rem',
    height: '1.25rem',
  }),

  waitingIcon: rule({
    composes: '$actionIcon',
  }),

  infoIcon: rule({
    composes: '$actionIcon',
    color: theme.colors.topaz,
  }),

  enableLabel: rule({
    color: theme.colors.topaz,
    lineHeight: '1rem',
  }),

  waitingLabel: rule({
    color: theme.colors.royalPurple,
  }),

  enableButton: rule({
    marginLeft: 'auto',
  }),

  actionsButton: rule({
    padding: theme.spacing.unit * 0.75,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
