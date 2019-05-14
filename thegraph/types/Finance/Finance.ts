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

export class NewPeriod extends EthereumEvent {
  get params(): NewPeriodParams {
    return new NewPeriodParams(this);
  }
}

export class NewPeriodParams {
  _event: NewPeriod;

  constructor(event: NewPeriod) {
    this._event = event;
  }

  get periodId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get periodStarts(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get periodEnds(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class SetBudget extends EthereumEvent {
  get params(): SetBudgetParams {
    return new SetBudgetParams(this);
  }
}

export class SetBudgetParams {
  _event: SetBudget;

  constructor(event: SetBudget) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get hasBudget(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class NewPayment extends EthereumEvent {
  get params(): NewPaymentParams {
    return new NewPaymentParams(this);
  }
}

export class NewPaymentParams {
  _event: NewPayment;

  constructor(event: NewPayment) {
    this._event = event;
  }

  get paymentId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get maxRepeats(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get reference(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class NewTransaction extends EthereumEvent {
  get params(): NewTransactionParams {
    return new NewTransactionParams(this);
  }
}

export class NewTransactionParams {
  _event: NewTransaction;

  constructor(event: NewTransaction) {
    this._event = event;
  }

  get transactionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get incoming(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }

  get entity(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get reference(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class ChangePaymentState extends EthereumEvent {
  get params(): ChangePaymentStateParams {
    return new ChangePaymentStateParams(this);
  }
}

export class ChangePaymentStateParams {
  _event: ChangePaymentState;

  constructor(event: ChangePaymentState) {
    this._event = event;
  }

  get paymentId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get inactive(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class ChangePeriodDuration extends EthereumEvent {
  get params(): ChangePeriodDurationParams {
    return new ChangePeriodDurationParams(this);
  }
}

export class ChangePeriodDurationParams {
  _event: ChangePeriodDuration;

  constructor(event: ChangePeriodDuration) {
    this._event = event;
  }

  get newDuration(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class PaymentFailure extends EthereumEvent {
  get params(): PaymentFailureParams {
    return new PaymentFailureParams(this);
  }
}

export class PaymentFailureParams {
  _event: PaymentFailure;

  constructor(event: PaymentFailure) {
    this._event = event;
  }

  get paymentId(): BigInt {
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

export class Finance__getPaymentResult {
  value0: Address;
  value1: Address;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: boolean;
  value7: BigInt;
  value8: Address;

  constructor(
    value0: Address,
    value1: Address,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: boolean,
    value7: BigInt,
    value8: Address
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
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromAddress(this.value0));
    map.set("value1", EthereumValue.fromAddress(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    map.set("value4", EthereumValue.fromUnsignedBigInt(this.value4));
    map.set("value5", EthereumValue.fromUnsignedBigInt(this.value5));
    map.set("value6", EthereumValue.fromBoolean(this.value6));
    map.set("value7", EthereumValue.fromUnsignedBigInt(this.value7));
    map.set("value8", EthereumValue.fromAddress(this.value8));
    return map;
  }
}

export class Finance__getTransactionResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: Address;
  value5: Address;
  value6: boolean;
  value7: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: Address,
    value5: Address,
    value6: boolean,
    value7: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromUnsignedBigInt(this.value0));
    map.set("value1", EthereumValue.fromUnsignedBigInt(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    map.set("value4", EthereumValue.fromAddress(this.value4));
    map.set("value5", EthereumValue.fromAddress(this.value5));
    map.set("value6", EthereumValue.fromBoolean(this.value6));
    map.set("value7", EthereumValue.fromUnsignedBigInt(this.value7));
    return map;
  }
}

export class Finance__getPeriodResult {
  value0: boolean;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: boolean,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromBoolean(this.value0));
    map.set("value1", EthereumValue.fromUnsignedBigInt(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    map.set("value4", EthereumValue.fromUnsignedBigInt(this.value4));
    return map;
  }
}

export class Finance__getPeriodTokenStatementResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromUnsignedBigInt(this.value0));
    map.set("value1", EthereumValue.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class Finance__getBudgetResult {
  value0: BigInt;
  value1: boolean;

  constructor(value0: BigInt, value1: boolean) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromUnsignedBigInt(this.value0));
    map.set("value1", EthereumValue.fromBoolean(this.value1));
    return map;
  }
}

export class Finance extends SmartContract {
  static bind(address: Address): Finance {
    return new Finance("Finance", address);
  }

  hasInitialized(): boolean {
    let result = super.call("hasInitialized", []);
    return result[0].toBoolean();
  }

  CREATE_PAYMENTS_ROLE(): Bytes {
    let result = super.call("CREATE_PAYMENTS_ROLE", []);
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

  CHANGE_PERIOD_ROLE(): Bytes {
    let result = super.call("CHANGE_PERIOD_ROLE", []);
    return result[0].toBytes();
  }

  CHANGE_BUDGETS_ROLE(): Bytes {
    let result = super.call("CHANGE_BUDGETS_ROLE", []);
    return result[0].toBytes();
  }

  periodsLength(): BigInt {
    let result = super.call("periodsLength", []);
    return result[0].toBigInt();
  }

  appId(): Bytes {
    let result = super.call("appId", []);
    return result[0].toBytes();
  }

  getInitializationBlock(): BigInt {
    let result = super.call("getInitializationBlock", []);
    return result[0].toBigInt();
  }

  EXECUTE_PAYMENTS_ROLE(): Bytes {
    let result = super.call("EXECUTE_PAYMENTS_ROLE", []);
    return result[0].toBytes();
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

  paymentsNextIndex(): BigInt {
    let result = super.call("paymentsNextIndex", []);
    return result[0].toBigInt();
  }

  isPetrified(): boolean {
    let result = super.call("isPetrified", []);
    return result[0].toBoolean();
  }

  MANAGE_PAYMENTS_ROLE(): Bytes {
    let result = super.call("MANAGE_PAYMENTS_ROLE", []);
    return result[0].toBytes();
  }

  transactionsNextIndex(): BigInt {
    let result = super.call("transactionsNextIndex", []);
    return result[0].toBigInt();
  }

  vault(): Address {
    let result = super.call("vault", []);
    return result[0].toAddress();
  }

  allowRecoverability(param0: Address): boolean {
    let result = super.call("allowRecoverability", [
      EthereumValue.fromAddress(param0)
    ]);
    return result[0].toBoolean();
  }

  getPayment(_paymentId: BigInt): Finance__getPaymentResult {
    let result = super.call("getPayment", [
      EthereumValue.fromUnsignedBigInt(_paymentId)
    ]);
    return new Finance__getPaymentResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBoolean(),
      result[7].toBigInt(),
      result[8].toAddress()
    );
  }

  getTransaction(_transactionId: BigInt): Finance__getTransactionResult {
    let result = super.call("getTransaction", [
      EthereumValue.fromUnsignedBigInt(_transactionId)
    ]);
    return new Finance__getTransactionResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toAddress(),
      result[5].toAddress(),
      result[6].toBoolean(),
      result[7].toBigInt()
    );
  }

  getPeriod(_periodId: BigInt): Finance__getPeriodResult {
    let result = super.call("getPeriod", [
      EthereumValue.fromUnsignedBigInt(_periodId)
    ]);
    return new Finance__getPeriodResult(
      result[0].toBoolean(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  getPeriodTokenStatement(
    _periodId: BigInt,
    _token: Address
  ): Finance__getPeriodTokenStatementResult {
    let result = super.call("getPeriodTokenStatement", [
      EthereumValue.fromUnsignedBigInt(_periodId),
      EthereumValue.fromAddress(_token)
    ]);
    return new Finance__getPeriodTokenStatementResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  nextPaymentTime(_paymentId: BigInt): BigInt {
    let result = super.call("nextPaymentTime", [
      EthereumValue.fromUnsignedBigInt(_paymentId)
    ]);
    return result[0].toBigInt();
  }

  getPeriodDuration(): BigInt {
    let result = super.call("getPeriodDuration", []);
    return result[0].toBigInt();
  }

  getBudget(_token: Address): Finance__getBudgetResult {
    let result = super.call("getBudget", [EthereumValue.fromAddress(_token)]);
    return new Finance__getBudgetResult(
      result[0].toBigInt(),
      result[1].toBoolean()
    );
  }

  getRemainingBudget(_token: Address): BigInt {
    let result = super.call("getRemainingBudget", [
      EthereumValue.fromAddress(_token)
    ]);
    return result[0].toBigInt();
  }

  currentPeriodId(): BigInt {
    let result = super.call("currentPeriodId", []);
    return result[0].toBigInt();
  }
}
