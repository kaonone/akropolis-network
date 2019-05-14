import { Theme as MaterialTheme } from '@material-ui/core/styles';
import { hexToRGBA } from 'shared/helpers/style';
import breakpoints from './breakpoints';

// Find color name http://chir.ag/projects/name-that-color
// https://github.com/insomnious0x01/ntc-js
const colors = {
  mediumPurple: '#8c4be6',
  purpleHeart: '#6931b6',
  heliotrope: '#c17bff',
  wildSand: '#f4f4f4',
  mercury: '#e2e2e2',
  silver: '#c9c9c9',
  dustyGray: '#979797',
  codGray: '#1e1e1e',
  monza: '#d0021b',
  buttercup: '#f5a623',
  white: '#fff',
  black: '#000',
  gray: '#868686',
  alto: '#e0e0e0',
  heavyMetal: '#1d1d1b',
  alabaster: '#f8f8f8',
  silverChalice: '#aeaeae',
  tundora: '#4A4A4A',
  salem: '#0EA33A',
  ripeLemon: '#f8e71c',
  blackCurrant: '#2E2639',
  springWood: '#f1efe3',
  harp: '#e3f1e3',
  valencia: '#D63B3B',
  electricViolet: '#9013FE',
  apple: '#35BC2D',
  haiti: '#1D1135',
  topaz: '#746E85',
  royalPurple: '#613AAF',
  coldPurple: '#B09CD7',
  whiteLilac: '#EFEBF7',
  frenchGray: '#B6B3C0',
  athensGray: '#E8E7EB',
  shamrock: '#2ED573',
  geraldine: '#FF7888',
  ghostWhite: '#F7F5FB',
  martinique: '#3F3553',
  mulledWine: '#4A415D',
  daisyBush: '#502D98',
};

const gradients = {
  purple: 'linear-gradient(360deg, #7357D2 0%, #8E41DC 100%)',
};

export const theme = {
  breakpoints,
  colors,
  gradients,
  palette: {
    text: {
      primary: colors.haiti,
      primaryInverted: colors.white,
      secondary: colors.topaz,
      warning: colors.buttercup,
      positive: colors.purpleHeart,
      negative: colors.monza,
      disabled: hexToRGBA(colors.codGray, 0.55),
    },
    control: {
      border: {
        normal: colors.mercury,
        hover: colors.purpleHeart,
        focus: colors.mediumPurple,
        disabled: colors.mercury,
      },
      bg: {
        normal: colors.white,
        hover: colors.purpleHeart,
        focus: colors.mediumPurple,
        disabled: colors.mercury,
        overlay: hexToRGBA(colors.black, 0.18),
      },
    },
  },
  sizes: {
    control: {
      borderRadius: 4,
      minHeight: 40,
    },
    page: {
      maxWidth: 1200,
    },
    header: {
      minHeightMobile: '4rem',
      minHeightDesktop: '6.25rem',
    },
  },
  spacing: {
    unit: 8,
  },
  typography: {
    primaryFont: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
  zIndex: {
    newContext: 0,
    mobileHeader: 500,
    modal: 1300,
    signTransactionsModal: 1305,
    tooltip: 1500,
    beforeContext: (zIndex: number) => --zIndex,
    afterContext: (zIndex: number) => ++zIndex,
  },
  defaultTransitionDuration: '0.4s',
  tableColumns: {
    width: {
      name: '12rem',
      stake: '5.2rem',
      performance: '5rem',
      rating: '7rem',
      nextInstalment: '7.2rem',
      cashFlowBalance: '6.5rem',
      discount: '4rem',
      dueAmount: '6rem',
    },
  },
};

export type Theme = MaterialTheme & { extra: typeof theme };
