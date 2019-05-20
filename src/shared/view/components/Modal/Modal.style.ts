// tslint:disable-next-line:import-blacklist
import injectSheet from 'react-jss';
import { GetProps } from '_helpers';
import { Theme, WithStyles } from 'shared/styles';
import { rule, styledBy } from 'shared/helpers/style';
import { Typography } from 'shared/view/elements';

import { IProps } from './Modal';

export const titleVariant: NonNullable<GetProps<typeof Typography>['variant']> = 'h5';

const styles = (theme: Theme) => ({
  portal: rule({
    overflow: 'auto',
    position: 'fixed',
    top: -1,
    right: -1,
    bottom: -1,
    left: -1,
    zIndex: styledBy<IProps, 'type'>('type', {
      default: theme.extra.zIndex.modal,
      signTransaction: theme.extra.zIndex.signTransactionsModal,
    }, 'default'),

    '&:empty': {
      display: 'none',
    },
  }),
  overlay: rule({
    position: 'relative',
    minHeight: '100%',
    minWidth: '100%',
    padding: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.extra.palette.control.bg.overlay,
  }),
  modal: rule({
    position: 'relative',
    flexGrow: 1,
    minHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: theme.extra.colors.white,
    outline: 'none',
    opacity: 0,
    overflow: 'hidden',

    [theme.extra.breakpoints.up('sm')]: rule({
      flexGrow: 0,
      minHeight: 'unset',
      minWidth: 'unset',
      width: styledBy<IProps, 'size'>('size', {
        small: '16rem',
        medium: '25rem',
        large: '35rem',
        xLarge: '45rem',
      }),
      margin: '3rem',
      borderRadius: '0.5rem',
      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    }),

    [theme.extra.breakpoints.up('md')]: rule({
      width: styledBy<IProps, 'size'>('size', {
        small: '21rem',
        medium: '30rem',
        large: '40rem',
        xLarge: '50rem',
      }),
    }),
  }),

  modalAfterOpen: rule({
    animationName: 'modal-appear-animation',
    animationDuration: '500ms',
    animationFillMode: 'forwards',
  }),
  overlayAfterOpen: rule({
    animationName: 'overlay-appear-animation',
    animationDuration: '500ms',
    animationFillMode: 'forwards',
  }),
  modalBeforeClose: rule({
    animationName: 'modal-disappear-animation',
    animationDuration: '400ms',
    animationFillMode: 'forwards',
  }),
  overlayBeforeClose: rule({
    animationName: 'overlay-disappear-animation',
    animationDuration: '400ms',
    animationFillMode: 'forwards',
  }),

  title: rule({
    alignSelf: 'center',
    margin: `${theme.extra.spacing.unit * 5}px ${theme.extra.spacing.unit * 5}px ${theme.extra.spacing.unit * 4}px`,
  }),

  titleIcon: rule({
    ...theme.typography[titleVariant],
    ...theme.overrides && theme.overrides.MuiTypography && theme.overrides.MuiTypography[titleVariant],
  }),

  titleIconAligner: rule({
    verticalAlign: 'middle',
  }),

  content: rule({
    margin: `0 ${theme.extra.spacing.unit * 5}px ${theme.extra.spacing.unit * 6}px`,
  }),

  cross: rule({
    position: 'absolute',
    top: theme.extra.spacing.unit,
    right: theme.extra.spacing.unit,
    zIndex: theme.extra.zIndex.newContext + 1,
  }),

  isAbsolute: {},
  isHidden: {
    display: styledBy<IProps, 'titleAlign'>('titleAlign', {
      center: 'block',
      left: 'none',
    }, 'center'),
  },

  '@keyframes modal-disappear-animation': rule({
    from: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    to: {
      opacity: 0,
      transform: 'translateY(50%)',
    },
  }),

  '@keyframes modal-appear-animation': rule({
    from: {
      opacity: 0,
      transform: 'translateY(25%)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }),

  '@keyframes overlay-appear-animation': rule({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  }),

  '@keyframes overlay-disappear-animation': rule({
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
