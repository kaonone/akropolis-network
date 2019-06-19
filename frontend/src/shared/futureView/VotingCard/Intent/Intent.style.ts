import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
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

  deFiIcon: rule({
    composes: '$votingTypeIcon',
    color: theme.colors.blueRibbon,
  }),

  enableInvestmentIcon: rule({
    composes: '$votingTypeIcon',
    color: theme.colors.jungleGreen,
  }),

  disableInvestmentIcon: rule({
    composes: '$votingTypeIcon',
    color: theme.colors.monza,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
