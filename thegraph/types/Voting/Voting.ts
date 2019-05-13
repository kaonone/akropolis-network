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

export class StartVote extends EthereumEvent {
  get params(): StartVoteParams {
    return new StartVoteParams(this);
  }
}

export class StartVoteParams {
  _event: StartVote;

  constructor(event: StartVote) {
    this._event = event;
  }

  get voteId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get metadata(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class CastVote extends EthereumEvent {
  get params(): CastVoteParams {
    return new CastVoteParams(this);
  }
}

export class CastVoteParams {
  _event: CastVote;

  constructor(event: CastVote) {
    this._event = event;
  }

  get voteId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get supports(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get stake(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class ExecuteVote extends EthereumEvent {
  get params(): ExecuteVoteParams {
    return new ExecuteVoteParams(this);
  }
}

export class ExecuteVoteParams {
  _event: ExecuteVote;

  constructor(event: ExecuteVote) {
    this._event = event;
  }

  get voteId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ChangeSupportRequired extends EthereumEvent {
  get params(): ChangeSupportRequiredParams {
    return new ChangeSupportRequiredParams(this);
  }
}

export class ChangeSupportRequiredParams {
  _event: ChangeSupportRequired;

  constructor(event: ChangeSupportRequired) {
    this._event = event;
  }

  get supportRequiredPct(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ChangeMinQuorum extends EthereumEvent {
  get params(): ChangeMinQuorumParams {
    return new ChangeMinQuorumParams(this);
  }
}

export class ChangeMinQuorumParams {
  _event: ChangeMinQuorum;

  constructor(event: ChangeMinQuorum) {
    this._event = event;
  }

  get minAcceptQuorumPct(): BigInt {
    return this._event.parameters[0].value.toBigInt();
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

export class Voting__getVoteResult {
  value0: boolean;
  value1: boolean;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;
  value7: BigInt;
  value8: BigInt;
  value9: Bytes;

  constructor(
    value0: boolean,
    value1: boolean,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt,
    value7: BigInt,
    value8: BigInt,
    value9: Bytes
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromBoolean(this.value0));
    map.set("value1", EthereumValue.fromBoolean(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    map.set("value4", EthereumValue.fromUnsignedBigInt(this.value4));
    map.set("value5", EthereumValue.fromUnsignedBigInt(this.value5));
    map.set("value6", EthereumValue.fromUnsignedBigInt(this.value6));
    map.set("value7", EthereumValue.fromUnsignedBigInt(this.value7));
    map.set("value8", EthereumValue.fromUnsignedBigInt(this.value8));
    map.set("value9", EthereumValue.fromFixedBytes(this.value9));
    return map;
  }
}

export class Voting extends SmartContract {
  static bind(address: Address): Voting {
    return new Voting("Voting", address);
  }

  hasInitialized(): boolean {
    let result = super.call("hasInitialized", []);
    return result[0].toBoolean();
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

  MODIFY_QUORUM_ROLE(): Bytes {
    let result = super.call("MODIFY_QUORUM_ROLE", []);
    return result[0].toBytes();
  }

  MODIFY_SUPPORT_ROLE(): Bytes {
    let result = super.call("MODIFY_SUPPORT_ROLE", []);
    return result[0].toBytes();
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

  voteTime(): BigInt {
    let result = super.call("voteTime", []);
    return result[0].toBigInt();
  }

  CREATE_VOTES_ROLE(): Bytes {
    let result = super.call("CREATE_VOTES_ROLE", []);
    return result[0].toBytes();
  }

  kernel(): Address {
    let result = super.call("kernel", []);
    return result[0].toAddress();
  }

  minAcceptQuorumPct(): BigInt {
    let result = super.call("minAcceptQuorumPct", []);
    return result[0].toBigInt();
  }

  isPetrified(): boolean {
    let result = super.call("isPetrified", []);
    return result[0].toBoolean();
  }

  votesLength(): BigInt {
    let result = super.call("votesLength", []);
    return result[0].toBigInt();
  }

  supportRequiredPct(): BigInt {
    let result = super.call("supportRequiredPct", []);
    return result[0].toBigInt();
  }

  token(): Address {
    let result = super.call("token", []);
    return result[0].toAddress();
  }

  PCT_BASE(): BigInt {
    let result = super.call("PCT_BASE", []);
    return result[0].toBigInt();
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

  canVote(_voteId: BigInt, _voter: Address): boolean {
    let result = super.call("canVote", [
      EthereumValue.fromUnsignedBigInt(_voteId),
      EthereumValue.fromAddress(_voter)
    ]);
    return result[0].toBoolean();
  }

  canExecute(_voteId: BigInt): boolean {
    let result = super.call("canExecute", [
      EthereumValue.fromUnsignedBigInt(_voteId)
    ]);
    return result[0].toBoolean();
  }

  getVote(_voteId: BigInt): Voting__getVoteResult {
    let result = super.call("getVote", [
      EthereumValue.fromUnsignedBigInt(_voteId)
    ]);
    return new Voting__getVoteResult(
      result[0].toBoolean(),
      result[1].toBoolean(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBigInt(),
      result[8].toBigInt(),
      result[9].toBytes()
    );
  }

  getVoterState(_voteId: BigInt, _voter: Address): i32 {
    let result = super.call("getVoterState", [
      EthereumValue.fromUnsignedBigInt(_voteId),
      EthereumValue.fromAddress(_voter)
    ]);
    return result[0].toI32();
  }
}
