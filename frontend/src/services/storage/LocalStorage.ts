import { storageKeys } from './keys';

class LocalStorage {
  public static checkAvailability() {
    const testKey = '__test__';

    try {
      localStorage.setItem(testKey, '__test-value__');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('Local storage is not available! Some features will be disabled!');
      return false;
    }
  }

  private isLocalStorageAvailable: boolean | null = null;

  constructor(version: string) {
    this.isLocalStorageAvailable = LocalStorage.checkAvailability();
    this.checkVersion(version);
  }

  public set<T>(key: string, item: T): void {
    if (!this.isLocalStorageAvailable) { return; }

    localStorage.setItem(key, JSON.stringify(item));
  }

  public get<T>(key: string) {
    if (!this.isLocalStorageAvailable) { return null; }

    const data = localStorage.getItem(key);

    try {
      return data ? JSON.parse(data) as T : null;
    } catch (e) {
      console.error(
        `Error while parsing data from localstorage for key: ${key}.
        Error is: ${e.message}, stack is: ${e.stack}`,
      );
      return null;
    }
  }

  public add(storageKey: string, itemKey: string, item: string) {
    if (!this.isLocalStorageAvailable) { return null; }
    try {
      const storageItems = localStorage.getItem(storageKey);
      const items: Record<string, string> = storageItems ? JSON.parse(storageItems) : {};
      items[itemKey] = item;
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (e) {
      console.error(
        `Error while add data to localstorage for key: ${storageKey} and itemKey: ${itemKey}.
        Error is: ${e.message}, stack is: ${e.stack}`,
      );
      return null;
    }
  }

  public remove(storageKey: string, itemKey?: string) {
    if (!this.isLocalStorageAvailable) { return null; }
    try {
      if (!itemKey) {
        localStorage.removeItem(storageKey);
        return;
      }

      const storageItems = localStorage.getItem(storageKey);
      if (!storageItems) {
        return;
      }
      const items: Record<string, string> = JSON.parse(storageItems);
      delete items[itemKey];
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (e) {
      console.error(
        `Error while remove data from localstorage for storageKey: ${storageKey}
        ${itemKey ? ' itemKey: ' + itemKey : ''}.
        Error is: ${e.message}, stack is: ${e.stack}`,
      );
      return null;
    }
  }

  public reset() {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(storageKeys.addressesSignatures);
    }
  }

  private checkVersion(version: string) {
    const currentVersion = this.getVersion();
    if (currentVersion !== version) {
      this.reset();
      this.saveVersion(version);
    }
  }

  private getVersion() {
    return this.get<string | null>('version');
  }

  private saveVersion(version: string) {
    this.set('version', version);
  }
}

export default LocalStorage;
