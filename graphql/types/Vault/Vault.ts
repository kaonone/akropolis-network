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

export class VaultTransfer extends EthereumEvent {
  get params(): VaultTransferParams {
    return new VaultTransferParams(this);
  }
}

export class VaultTransferParams {
  _event: VaultTransfer;

  constructor(event: VaultTransfer) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class VaultDeposit extends EthereumEvent {
  get params(): VaultDepositParams {
    return new VaultDepositParams(this);
  }
}

export class VaultDepositParams {
  _event: VaultDeposit;

  constructor(event: VaultDeposit) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
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

export class Vault extends SmartContract {
  static bind(address: Address): Vault {
    return new Vault("Vault", address);
  }

  hasInitialized(): boolean {
    let result = super.call("hasInitialized", []);
    return result[0].toBoolean();
  }

  TRANSFER_ROLE(): Bytes {
    let result = super.call("TRANSFER_ROLE", []);
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

  isDepositable(): boolean {
    let result = super.call("isDepositable", []);
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

  kernel(): Address {
    let result = super.call("kernel", []);
    return result[0].toAddress();
  }

  isPetrified(): boolean {
    let result = super.call("isPetrified", []);
    return result[0].toBoolean();
  }

  balance(_token: Address): BigInt {
    let result = super.call("balance", [EthereumValue.fromAddress(_token)]);
    return result[0].toBigInt();
  }

  allowRecoverability(param0: Address): boolean {
    let result = super.call("allowRecoverability", [
      EthereumValue.fromAddress(param0)
    ]);
    return result[0].toBoolean();
  }
}
