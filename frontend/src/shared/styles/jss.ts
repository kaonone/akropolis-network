// tslint:disable-next-line:import-blacklist
import injectSheet, { Theme, WithStyles, SheetsRegistry, JSS, CSSProperties, JssProvider } from 'react-jss';
import { withStyles as muiWithStyles } from '@material-ui/core/styles';

const withStyles = muiWithStyles as typeof injectSheet;

export { withStyles, Theme, WithStyles, SheetsRegistry, JSS, CSSProperties, JssProvider };
