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

export class EnableExecutor extends EthereumEvent {
  get params(): EnableExecutorParams {
    return new EnableExecutorParams(this);
  }
}

export class EnableExecutorParams {
  _event: EnableExecutor;

  constructor(event: EnableExecutor) {
    this._event = event;
  }

  get executorId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get executorAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class DisableExecutor extends EthereumEvent {
  get params(): DisableExecutorParams {
    return new DisableExecutorParams(this);
  }
}

export class DisableExecutorParams {
  _event: DisableExecutor;

  constructor(event: DisableExecutor) {
    this._event = event;
  }

  get executorId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get executorAddress(): Address {
    return this._event.parameters[1].value.toAddress();
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

export class EVMScriptRegistry__executorsResult {
  value0: Address;
  value1: boolean;

  constructor(value0: Address, value1: boolean) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromAddress(this.value0));
    map.set("value1", EthereumValue.fromBoolean(this.value1));
    return map;
  }
}

export class EVMScriptRegistry extends SmartContract {
  static bind(address: Address): EVMScriptRegistry {
    return new EVMScriptRegistry("EVMScriptRegistry", address);
  }

  hasInitialized(): boolean {
    let result = super.call("hasInitialized", []);
    return result[0].toBoolean();
  }

  REGISTRY_ADD_EXECUTOR_ROLE(): Bytes {
    let result = super.call("REGISTRY_ADD_EXECUTOR_ROLE", []);
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

  REGISTRY_MANAGER_ROLE(): Bytes {
    let result = super.call("REGISTRY_MANAGER_ROLE", []);
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

  executors(param0: BigInt): EVMScriptRegistry__executorsResult {
    let result = super.call("executors", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);
    return new EVMScriptRegistry__executorsResult(
      result[0].toAddress(),
      result[1].toBoolean()
    );
  }

  getScriptExecutor(_script: Bytes): Address {
    let result = super.call("getScriptExecutor", [
      EthereumValue.fromFixedBytes(_script)
    ]);
    return result[0].toAddress();
  }
}
