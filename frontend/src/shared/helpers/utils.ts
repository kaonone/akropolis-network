export function isElectron() {
  // See https://github.com/electron/electron/issues/2288
  return (
    typeof navigator === 'object' &&
    typeof navigator.userAgent === 'string' &&
    navigator.userAgent.indexOf('Electron') >= 0
  );
}

export function noop() { /* */ }

export function removeStartingSlash(str: string) {
  return str.replace(/^\/+/, '');
}

// Append a trailing slash if needed
export function appendTrailingSlash(str: string) {
  return str + (str.endsWith('/') ? '' : '/');
}
