import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
  }),

  headerButton: rule({
    color: theme.colors.royalPurple,
    marginLeft: theme.spacing.unit,
  }),

  headerButtonIcon: rule({
    marginRight: theme.spacing.unit,
  }),
  headerButtonTitle: rule({
    color: theme.colors.royalPurple,
  }),

  sectionLink: rule({
    '&:last-child': {
      marginLeft: 'auto',
    },
  }),

  activitiesCount: rule({
    minWidth: '1rem',
    height: '1rem',
    padding: '0.125rem',
    overflow: 'hidden',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
    borderRadius: '50%',
    color: theme.colors.white,
    backgroundColor: theme.colors.royalPurple,
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
