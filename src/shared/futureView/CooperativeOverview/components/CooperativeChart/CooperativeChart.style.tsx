import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
  }),

  header: rule({
    marginBottom: theme.spacing.unit * 3,
  }),

  headerTitle: rule({
    color: theme.colors.topaz,
  }),

  avatarStub: rule({
    width: '1.5rem',
    height: '1.5rem',
    marginRight: '-0.375rem',
  }),

  membersCount: rule({
    composes: '$avatarStub',
    backgroundColor: theme.colors.athensGray,
  }),

  balance: rule({
    marginBottom: theme.spacing.unit,
  }),

  balanceValue: rule({
    marginRight: theme.spacing.unit,
  }),

  balanceChange: rule({
    lineHeight: '1.875rem',
    color: theme.colors.shamrock,
  }),

  arrowIcon: rule({
    width: '0.625rem',
    height: '0.625rem',
    marginRight: theme.spacing.unit * 0.5,
  }),

  graphic: rule({
    width: '100%',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
