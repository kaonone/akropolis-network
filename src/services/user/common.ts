import { observable } from 'mobx';
import { ReplaySubject, ConnectableObservable } from 'rxjs';
import { distinctUntilChanged, publishReplay } from 'rxjs/operators';

import { web3Providers } from 'core/constants';
import { getWeb3, getMainAccount } from 'shared/helpers/web3';

export const observableAddress = observable({
  address: '',
});

const addresses$ = new ReplaySubject<string>();

export const currentAddress$ = addresses$.pipe(
  distinctUntilChanged(),
  publishReplay(1),
);

(currentAddress$ as ConnectableObservable<string>).connect();

export async function getCurrentAccount() {
  return new Promise<string>(resolve => {
    currentAddress$.subscribe(resolve);
  });
}

setInterval(async () => {
  const account = await getAccount();
  observableAddress.address = account;
  addresses$.next(account);
}, 1000);

async function getAccount() {
  return (await getMainAccount(getWeb3(web3Providers.wallet)) || '');
}
