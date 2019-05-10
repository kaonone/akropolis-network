import getEnvParams from 'core/getEnvParams';

export function notifyDevWarning(isShownWarning: boolean, msg: string, additionalLog?: any) {
  if (!getEnvParams().isProduction && isShownWarning) {
    window.alert('Dev warning. See developer console for more info');
    console.error(new Error(msg));
    additionalLog && console.log('Additional log:', additionalLog);
  }
}
