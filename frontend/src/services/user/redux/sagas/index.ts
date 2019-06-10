import { SagaIterator, eventChannel, EventChannel } from 'redux-saga';
import { put, takeLatest, take, select, call } from 'redux-saga/effects';
import * as sigUtil from 'eth-sig-util';

import { addressesEqual } from 'shared/helpers/web3';
import { IDependencies } from 'shared/types/app';
import { storageKeys } from 'services/storage';
import { getErrorMsg } from 'shared/helpers';
import { messageForSignature } from 'shared/constants';

import * as NS from '../../namespace';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { currentAddress$, getCurrentAccount } from '../../common';

const completeAuthenticationType: NS.ICompleteAuthentication['type'] = 'USER:COMPLETE_AUTHENTICATION';
const checkIsUserSignedType: NS.ICheckIsUserSigned['type'] = 'USER:CHECK_IS_USER_SIGNED';
const logoutType: NS.ILogout['type'] = 'USER:LOGOUT';

export function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(completeAuthenticationType, listenAccountChange, deps);
    yield takeLatest(checkIsUserSignedType, checkIsUserSigned, deps);
    yield takeLatest(logoutType, logoutSaga, deps);
  };
}

export function* checkIsUserSigned({ drizzle, storage }: IDependencies, _a: NS.ICheckIsUserSigned) {
  try {
    const address = yield call(getCurrentAccount);

    if (isValidAddressSignature({ drizzle, storage }, address)) {
      yield put(actions.completeAuthentication(address));
    }

    yield put(actions.checkIsUserSignedSuccess());

  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.checkIsUserSignedFail(message));
  }
}

export function* logoutSaga({ storage }: IDependencies, _a: NS.ILogout) {
  try {
    const address = yield call(getCurrentAccount);
    storage.remove(storageKeys.addressesSignatures, address);
  } catch (error) {
    console.error(error);
  }
}

export function* listenAccountChange({ storage, drizzle }: IDependencies, _a: NS.ICompleteAuthentication) {
  const addressChannel: EventChannel<string | null> = eventChannel((emitter) => {
    const subscription = currentAddress$.subscribe((address: string | null) => {
      emitter(address);
    });
    return () => {
      subscription.unsubscribe();
    };
  });

  try {
    while (true) {
      const currentAddress = yield take(addressChannel);
      const confirmedAddress: ReturnType<typeof selectors.selectConfirmedAddress> =
        yield select(selectors.selectConfirmedAddress);

      if (!confirmedAddress || !addressesEqual(confirmedAddress, currentAddress)) {
        if (!isValidAddressSignature({ drizzle, storage }, currentAddress)) {
          yield put(actions.changeUser());
        } else {
          yield put(actions.checkIsUserSigned());
          return;
        }
      }
    }
  } catch (error) {
    //
  } finally {
    addressChannel.close();
  }
}

function isValidAddressSignature({ storage, drizzle }: Pick<IDependencies, 'storage' | 'drizzle'>, address: string) {
  const addressesSignatures = storage.get<Record<string, string>>(storageKeys.addressesSignatures);
  const addressSignature = addressesSignatures && addressesSignatures[address];

  if (!addressSignature) {
    return false;
  }
  const msg = drizzle.web3.utils.stringToHex(messageForSignature);
  const recovered = sigUtil.recoverPersonalSignature({
    data: msg,
    sig: addressSignature,
  });

  return recovered.toLowerCase() === address.toLowerCase();
}
