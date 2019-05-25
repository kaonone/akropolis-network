import { observable } from 'mobx';
import { useObserver } from 'mobx-react-lite';

import { web3Providers } from 'core/constants';
import { getWeb3, getMainAccount } from 'shared/helpers/web3';

const state = observable({
  address: '',
});

setInterval(async () => {
  state.address = await getAccount();
}, 1000);

async function getAccount() {
  return (await getMainAccount(getWeb3(web3Providers.wallet)) || '');
}

export function useAccountAddress() {
  return useObserver(() => state.address);
}
