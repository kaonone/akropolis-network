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

export class NewVesting extends EthereumEvent {
  get params(): NewVestingParams {
    return new NewVestingParams(this);
  }
}

export class NewVestingParams {
  _event: NewVesting;

  constructor(event: NewVesting) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get vestingId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class RevokeVesting extends EthereumEvent {
  get params(): RevokeVestingParams {
    return new RevokeVestingParams(this);
  }
}

export class RevokeVestingParams {
  _event: RevokeVesting;

  constructor(event: RevokeVesting) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get vestingId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get nonVestedAmount(): BigInt {
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

export class TokenManager__getVestingResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: boolean;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromUnsignedBigInt(this.value0));
    map.set("value1", EthereumValue.fromUnsignedBigInt(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    map.set("value4", EthereumValue.fromBoolean(this.value4));
    return map;
  }
}

export class TokenManager extends SmartContract {
  static bind(address: Address): TokenManager {
    return new TokenManager("TokenManager", address);
  }

  everHeld(param0: Address): boolean {
    let result = super.call("everHeld", [EthereumValue.fromAddress(param0)]);
    return result[0].toBoolean();
  }

  hasInitialized(): boolean {
    let result = super.call("hasInitialized", []);
    return result[0].toBoolean();
  }

  MAX_VESTINGS_PER_ADDRESS(): BigInt {
    let result = super.call("MAX_VESTINGS_PER_ADDRESS", []);
    return result[0].toBigInt();
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

  appId(): Bytes {
    let result = super.call("appId", []);
    return result[0].toBytes();
  }

  ISSUE_ROLE(): Bytes {
    let result = super.call("ISSUE_ROLE", []);
    return result[0].toBytes();
  }

  getInitializationBlock(): BigInt {
    let result = super.call("getInitializationBlock", []);
    return result[0].toBigInt();
  }

  vestingsLengths(param0: Address): BigInt {
    let result = super.call("vestingsLengths", [
      EthereumValue.fromAddress(param0)
    ]);
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

  ASSIGN_ROLE(): Bytes {
    let result = super.call("ASSIGN_ROLE", []);
    return result[0].toBytes();
  }

  BURN_ROLE(): Bytes {
    let result = super.call("BURN_ROLE", []);
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

  MINT_ROLE(): Bytes {
    let result = super.call("MINT_ROLE", []);
    return result[0].toBytes();
  }

  maxAccountTokens(): BigInt {
    let result = super.call("maxAccountTokens", []);
    return result[0].toBigInt();
  }

  REVOKE_VESTINGS_ROLE(): Bytes {
    let result = super.call("REVOKE_VESTINGS_ROLE", []);
    return result[0].toBytes();
  }

  token(): Address {
    let result = super.call("token", []);
    return result[0].toAddress();
  }

  isForwarder(): boolean {
    let result = super.call("isForwarder", []);
    return result[0].toBoolean();
  }

  canForward(_sender: Address, param1: Bytes): boolean {
    let result = super.call("canForward", [
      EthereumValue.fromAddress(_sender),
      EthereumValue.fromFixedBytes(param1)
    ]);
    return result[0].toBoolean();
  }

  getVesting(
    _recipient: Address,
    _vestingId: BigInt
  ): TokenManager__getVestingResult {
    let result = super.call("getVesting", [
      EthereumValue.fromAddress(_recipient),
      EthereumValue.fromUnsignedBigInt(_vestingId)
    ]);
    return new TokenManager__getVestingResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBoolean()
    );
  }

  spendableBalanceOf(_holder: Address): BigInt {
    let result = super.call("spendableBalanceOf", [
      EthereumValue.fromAddress(_holder)
    ]);
    return result[0].toBigInt();
  }

  transferableBalance(_holder: Address, _time: BigInt): BigInt {
    let result = super.call("transferableBalance", [
      EthereumValue.fromAddress(_holder),
      EthereumValue.fromUnsignedBigInt(_time)
    ]);
    return result[0].toBigInt();
  }

  allowRecoverability(_token: Address): boolean {
    let result = super.call("allowRecoverability", [
      EthereumValue.fromAddress(_token)
    ]);
    return result[0].toBoolean();
  }
}
