import { withStyles as muiWithStyles } from '@material-ui/core/styles';
import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    display: 'flex',
    position: 'relative',
  }),

  borderOverlay: rule({
    color: theme.colors.whiteLilac,
    '$primary &': {
      opacity: 0,
    },
  }),

  centring: rule({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(-90deg) !important',
  }),

  overlay: rule({
    composes: '$centring',

    '$primary &': {
      color: theme.colors.mischka,
    },

    '$secondary &': {
      color: theme.colors.whiteMorlac,
    },
  }),

  progress: rule({
    composes: '$centring',

    '$secondary &': {
      color: theme.colors.normalPurple,
    },
  }),

  circle: rule({
    strokeWidth: 2,
  }),

  progressCircle: rule({
    composes: '$circle',

    '$primary &': {
      strokeWidth: 3,
    },

    '$secondary &': {
      strokeLinecap: 'round',
    },
  }),

  values: rule({
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  percent: rule({

    '$primary &': {
      color: theme.colors.mulledWine,
      fontSize: '0.8125rem',
    },

    '$secondary &': {
      color: theme.colors.royalPurple,
    },
  }),

  goal: rule({
    color: theme.colors.topaz,
  }),

  primary: {},
  secondary: {},

});

export const provideStyles = (muiWithStyles as typeof withStyles)(styles);

export type StylesProps = WithStyles<typeof styles>;
