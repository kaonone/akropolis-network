import { useObserver } from 'mobx-react-lite';
import { observableAddress } from '../common';

export function useAccountAddress() {
  return useObserver(() => observableAddress.address);
}
