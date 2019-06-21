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
    lineHeight: 1.15,
  }),

  graphic: rule({
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    height: '260px',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
