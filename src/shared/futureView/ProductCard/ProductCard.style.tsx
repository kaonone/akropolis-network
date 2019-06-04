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

    '&$isDisabled': {
      color: theme.colors.topaz,
    },
  }),

  isDisabled: {},

  profit: rule({
    minHeight: '48px',
  }),

  metrics: rule({
    marginBottom: theme.spacing.unit * 4,
  }),

  title: rule({
    color: theme.colors.topaz,
  }),

  typeBadge: rule({
    padding: '2px 6px',
    marginRight: '10px',
    color: theme.colors.royalPurple,
    backgroundColor: theme.colors.whiteLilac,
    borderRadius: '20px',
    lineHeight: '16px',
  }),

  icon: rule({
    width: '48px',
    marginRight: theme.spacing.unit * 2,
  }),

  annualProfit: rule({
    color: 'inherit',
  }),

  metricTypography: rule({
    color: 'inherit',
  }),

  metricTitle: rule({
    composes: '$metricTypography',
  }),

  metricValue: rule({
    composes: '$metricTypography',
  }),

  waiting: rule({
    padding: theme.spacing.unit * 1.75,
    backgroundColor: theme.colors.whiteWine,
    borderRadius: '4px',
  }),

  needEnable: rule({
    padding: theme.spacing.unit * 0.5,
    backgroundColor: theme.colors.whiteWine,
    borderRadius: '4px',
  }),

  actionIcon: rule({
    weight: '20px',
    height: '20px',
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
  }),

  waitingLabel: rule({
    color: theme.colors.royalPurple,
  }),

  enableButton: rule({
    marginLeft: 'auto',
    padding: `0 ${theme.spacing.unit * 3}px`,
  }),

  actionsButton: rule({
    padding: theme.spacing.unit * 0.75,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
