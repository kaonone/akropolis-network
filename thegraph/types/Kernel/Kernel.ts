import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewAppProxy extends EthereumEvent {
  get params(): NewAppProxyParams {
    return new NewAppProxyParams(this);
  }
}

export class NewAppProxyParams {
  _event: NewAppProxy;

  constructor(event: NewAppProxy) {
    this._event = event;
  }

  get proxy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get isUpgradeable(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }

  get appId(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class SetApp extends EthereumEvent {
  get params(): SetAppParams {
    return new SetAppParams(this);
  }
}

export class SetAppParams {
  _event: SetApp;

  constructor(event: SetApp) {
    this._event = event;
  }

  get namespace(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get appId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get app(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Kernel extends SmartContract {
  static bind(address: Address): Kernel {
    return new Kernel("Kernel", address);
  }

  hasInitialized(): boolean {
    let result = super.call("hasInitialized", []);
    return result[0].toBoolean();
  }

  KERNEL_APP_ID(): Bytes {
    let result = super.call("KERNEL_APP_ID", []);
    return result[0].toBytes();
  }

  APP_ADDR_NAMESPACE(): Bytes {
    let result = super.call("APP_ADDR_NAMESPACE", []);
    return result[0].toBytes();
  }

  getRecoveryVault(): Address {
    let result = super.call("getRecoveryVault", []);
    return result[0].toAddress();
  }

  apps(param0: Bytes, param1: Bytes): Address {
    let result = super.call("apps", [
      EthereumValue.fromFixedBytes(param0),
      EthereumValue.fromFixedBytes(param1)
    ]);
    return result[0].toAddress();
  }

  CORE_NAMESPACE(): Bytes {
    let result = super.call("CORE_NAMESPACE", []);
    return result[0].toBytes();
  }

  allowRecoverability(token: Address): boolean {
    let result = super.call("allowRecoverability", [
      EthereumValue.fromAddress(token)
    ]);
    return result[0].toBoolean();
  }

  recoveryVaultAppId(): Bytes {
    let result = super.call("recoveryVaultAppId", []);
    return result[0].toBytes();
  }

  getInitializationBlock(): BigInt {
    let result = super.call("getInitializationBlock", []);
    return result[0].toBigInt();
  }

  APP_MANAGER_ROLE(): Bytes {
    let result = super.call("APP_MANAGER_ROLE", []);
    return result[0].toBytes();
  }

  getApp(_namespace: Bytes, _appId: Bytes): Address {
    let result = super.call("getApp", [
      EthereumValue.fromFixedBytes(_namespace),
      EthereumValue.fromFixedBytes(_appId)
    ]);
    return result[0].toAddress();
  }

  APP_BASES_NAMESPACE(): Bytes {
    let result = super.call("APP_BASES_NAMESPACE", []);
    return result[0].toBytes();
  }

  acl(): Address {
    let result = super.call("acl", []);
    return result[0].toAddress();
  }

  isPetrified(): boolean {
    let result = super.call("isPetrified", []);
    return result[0].toBoolean();
  }

  DEFAULT_ACL_APP_ID(): Bytes {
    let result = super.call("DEFAULT_ACL_APP_ID", []);
    return result[0].toBytes();
  }

  hasPermission(
    _who: Address,
    _where: Address,
    _what: Bytes,
    _how: Bytes
  ): boolean {
    let result = super.call("hasPermission", [
      EthereumValue.fromAddress(_who),
      EthereumValue.fromAddress(_where),
      EthereumValue.fromFixedBytes(_what),
      EthereumValue.fromFixedBytes(_how)
    ]);
    return result[0].toBoolean();
  }
}
