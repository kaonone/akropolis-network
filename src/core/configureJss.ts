import { create } from 'jss';
import jssCompose from 'jss-compose';
import { createGenerateClassName, jssPreset, createMuiTheme } from '@material-ui/core/styles';
import { IJssDependencies } from 'shared/types/app';
import { theme as extraTheme, Theme } from 'shared/styles/theme';

export function configureJss(virtual?: boolean): IJssDependencies {
  // Place to add jss-plugins [https://material-ui.com/customization/css-in-js/#plugins]
  const jss = create({ virtual, plugins: [...jssPreset().plugins, jssCompose()] });
  const generateClassName = createGenerateClassName();

  const theme: Theme = {
    ...(createMuiTheme({
      palette: {
        primary: {
          main: extraTheme.colors.purpleHeart,
          light: extraTheme.colors.heliotrope,
          dark: extraTheme.colors.royalPurple,
          contrastText: extraTheme.colors.white,
        },
        secondary: {
          main: extraTheme.colors.white,
          light: extraTheme.colors.white,
          dark: extraTheme.colors.white,
          contrastText: extraTheme.colors.royalPurple,
        },
        error: {
          main: extraTheme.colors.geraldine,
        },
        text: {
          primary: extraTheme.colors.haiti,
          disabled: extraTheme.colors.frenchGray,
          hint: extraTheme.colors.heliotrope,
        },
      },
      typography: {
        useNextVariants: true, // https://material-ui.com/style/typography/#migration-to-typography-v2
        fontFamily: extraTheme.typography.primaryFont,
      },
      shape: {
        borderRadius: extraTheme.sizes.control.borderRadius,
      },
      spacing: {
        unit: extraTheme.spacing.unit,
      },
      overrides: {
        MuiInput: {
          underline: {
            '&:hover:not($disabled):before': {
              borderBottom: `1px solid ${extraTheme.colors.royalPurple} !important`,
            },
          },
        },
        MuiInputLabel: {
          root: {
            color: extraTheme.colors.topaz,
          },
          error: {
            color: extraTheme.colors.topaz,
          },
        },
        MuiFormLabel: {
          root: {
            color: extraTheme.colors.topaz,
            '&$error': {
              color: extraTheme.colors.topaz,
            },
          },
        },
        MuiButton: {
          root: {
            textTransform: 'initial',
            minHeight: extraTheme.sizes.control.minHeight,
            fontWeight: 500,
          },
        },
        MuiSvgIcon: {
          root: {
            fontSize: 22,
          },
        },
        MuiSelect: {
          selectMenu: {
            display: 'flex',
            alignItems: 'center',
          },
        },
        MuiAvatar: {
          root: {
            fontWeight: 500,
            fontSize: '0.875rem',
          },
          colorDefault: {
            backgroundColor: extraTheme.colors.whiteLilac,
            color: extraTheme.colors.royalPurple,
          },
        },
        MuiTypography: {
          root: {
            display: 'unset',
          },
          h3: { fontSize: '3rem' },
          h4: { fontSize: '2.25rem' },
          h5: { fontSize: '1.75rem' },
          h6: { fontSize: '1.25rem', fontWeight: 400 },
          body1: { fontSize: '1rem' },
          body2: { fontSize: '0.875rem' },
          subtitle1: { fontSize: '0.75rem' },
          caption: { fontSize: '0.625rem' },
          overline: { fontSize: '0.625rem' },
        },
      },
    })),
    extra: extraTheme,
  };

  return { jss, generateClassName, theme };
}
