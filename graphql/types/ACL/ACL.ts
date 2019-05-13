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

export class SetPermission extends EthereumEvent {
  get params(): SetPermissionParams {
    return new SetPermissionParams(this);
  }
}

export class SetPermissionParams {
  _event: SetPermission;

  constructor(event: SetPermission) {
    this._event = event;
  }

  get entity(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get app(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get role(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get allowed(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class SetPermissionParams extends EthereumEvent {
  get params(): SetPermissionParamsParams {
    return new SetPermissionParamsParams(this);
  }
}

export class SetPermissionParamsParams {
  _event: SetPermissionParams;

  constructor(event: SetPermissionParams) {
    this._event = event;
  }

  get entity(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get app(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get role(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get paramsHash(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }
}

export class ChangePermissionManager extends EthereumEvent {
  get params(): ChangePermissionManagerParams {
    return new ChangePermissionManagerParams(this);
  }
}

export class ChangePermissionManagerParams {
  _event: ChangePermissionManager;

  constructor(event: ChangePermissionManager) {
    this._event = event;
  }

  get app(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get role(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get manager(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class ScriptResult extends EthereumEvent {
  get params(): ScriptResultParams {
    return new ScriptResultParams(this);
  }
}

export class ScriptResultParams {
  _event: ScriptResult;

  constructor(event: ScriptResult) {
    this._event = event;
  }

  get executor(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get script(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get input(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get returnData(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }
}

export class ACL__getPermissionParamResult {
  value0: i32;
  value1: i32;
  value2: BigInt;

  constructor(value0: i32, value1: i32, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromI32(this.value0));
    map.set("value1", EthereumValue.fromI32(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class ACL extends SmartContract {
  static bind(address: Address): ACL {
    return new ACL("ACL", address);
  }

  hasInitialized(): boolean {
    let result = super.call("hasInitialized", []);
    return result[0].toBoolean();
  }

  getPermissionParamsLength(
    _entity: Address,
    _app: Address,
    _role: Bytes
  ): BigInt {
    let result = super.call("getPermissionParamsLength", [
      EthereumValue.fromAddress(_entity),
      EthereumValue.fromAddress(_app),
      EthereumValue.fromFixedBytes(_role)
    ]);
    return result[0].toBigInt();
  }

  evalParams(
    _paramsHash: Bytes,
    _who: Address,
    _where: Address,
    _what: Bytes,
    _how: Array<BigInt>
  ): boolean {
    let result = super.call("evalParams", [
      EthereumValue.fromFixedBytes(_paramsHash),
      EthereumValue.fromAddress(_who),
      EthereumValue.fromAddress(_where),
      EthereumValue.fromFixedBytes(_what),
      EthereumValue.fromUnsignedBigIntArray(_how)
    ]);
    return result[0].toBoolean();
  }

  NO_PERMISSION(): Bytes {
    let result = super.call("NO_PERMISSION", []);
    return result[0].toBytes();
  }

  getEVMScriptExecutor(_script: Bytes): Address {
    let result = super.call("getEVMScriptExecutor", [
      EthereumValue.fromFixedBytes(_script)
    ]);
    return result[0].toAddress();
  }

  getRecoveryVault(): Address {
    let result = super.call("getRecoveryVault", []);
    return result[0].toAddress();
  }

  CREATE_PERMISSIONS_ROLE(): Bytes {
    let result = super.call("CREATE_PERMISSIONS_ROLE", []);
    return result[0].toBytes();
  }

  hasPermission(_who: Address, _where: Address, _what: Bytes): boolean {
    let result = super.call("hasPermission", [
      EthereumValue.fromAddress(_who),
      EthereumValue.fromAddress(_where),
      EthereumValue.fromFixedBytes(_what)
    ]);
    return result[0].toBoolean();
  }

  allowRecoverability(token: Address): boolean {
    let result = super.call("allowRecoverability", [
      EthereumValue.fromAddress(token)
    ]);
    return result[0].toBoolean();
  }

  appId(): Bytes {
    let result = super.call("appId", []);
    return result[0].toBytes();
  }

  getInitializationBlock(): BigInt {
    let result = super.call("getInitializationBlock", []);
    return result[0].toBigInt();
  }

  getPermissionParam(
    _entity: Address,
    _app: Address,
    _role: Bytes,
    _index: BigInt
  ): ACL__getPermissionParamResult {
    let result = super.call("getPermissionParam", [
      EthereumValue.fromAddress(_entity),
      EthereumValue.fromAddress(_app),
      EthereumValue.fromFixedBytes(_role),
      EthereumValue.fromUnsignedBigInt(_index)
    ]);
    return new ACL__getPermissionParamResult(
      result[0].toI32(),
      result[1].toI32(),
      result[2].toBigInt()
    );
  }

  canPerform(_sender: Address, _role: Bytes, _params: Array<BigInt>): boolean {
    let result = super.call("canPerform", [
      EthereumValue.fromAddress(_sender),
      EthereumValue.fromFixedBytes(_role),
      EthereumValue.fromUnsignedBigIntArray(_params)
    ]);
    return result[0].toBoolean();
  }

  getEVMScriptRegistry(): Address {
    let result = super.call("getEVMScriptRegistry", []);
    return result[0].toAddress();
  }

  ANY_ENTITY(): Address {
    let result = super.call("ANY_ENTITY", []);
    return result[0].toAddress();
  }

  getPermissionManager(_app: Address, _role: Bytes): Address {
    let result = super.call("getPermissionManager", [
      EthereumValue.fromAddress(_app),
      EthereumValue.fromFixedBytes(_role)
    ]);
    return result[0].toAddress();
  }

  EMPTY_PARAM_HASH(): Bytes {
    let result = super.call("EMPTY_PARAM_HASH", []);
    return result[0].toBytes();
  }

  kernel(): Address {
    let result = super.call("kernel", []);
    return result[0].toAddress();
  }

  isPetrified(): boolean {
    let result = super.call("isPetrified", []);
    return result[0].toBoolean();
  }

  BURN_ENTITY(): Address {
    let result = super.call("BURN_ENTITY", []);
    return result[0].toAddress();
  }

  hasPermission(
    _who: Address,
    _where: Address,
    _what: Bytes,
    _how: Array<BigInt>
  ): boolean {
    let result = super.call("hasPermission", [
      EthereumValue.fromAddress(_who),
      EthereumValue.fromAddress(_where),
      EthereumValue.fromFixedBytes(_what),
      EthereumValue.fromUnsignedBigIntArray(_how)
    ]);
    return result[0].toBoolean();
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
