import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt
} from "@graphprotocol/graph-ts";

export class DAO extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save DAO entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DAO entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("DAO", id.toString(), this);
  }

  static load(id: string): DAO | null {
    return store.get("DAO", id) as DAO | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class EVMScriptRegistryRoot extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save EVMScriptRegistryRoot entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save EVMScriptRegistryRoot entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("EVMScriptRegistryRoot", id.toString(), this);
  }

  static load(id: string): EVMScriptRegistryRoot | null {
    return store.get(
      "EVMScriptRegistryRoot",
      id
    ) as EVMScriptRegistryRoot | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class ENSResolver extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ENSResolver entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ENSResolver entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ENSResolver", id.toString(), this);
  }

  static load(id: string): ENSResolver | null {
    return store.get("ENSResolver", id) as ENSResolver | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get resolver(): Bytes {
    let value = this.get("resolver");
    return value.toBytes();
  }

  set resolver(value: Bytes) {
    this.set("resolver", Value.fromBytes(value));
  }
}

export class BaseApp extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save BaseApp entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save BaseApp entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("BaseApp", id.toString(), this);
  }

  static load(id: string): BaseApp | null {
    return store.get("BaseApp", id) as BaseApp | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get baseAddress(): Bytes {
    let value = this.get("baseAddress");
    return value.toBytes();
  }

  set baseAddress(value: Bytes) {
    this.set("baseAddress", Value.fromBytes(value));
  }
}

export class Kernel extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Kernel entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Kernel entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Kernel", id.toString(), this);
  }

  static load(id: string): Kernel | null {
    return store.get("Kernel", id) as Kernel | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appID(): string {
    let value = this.get("appID");
    return value.toString();
  }

  set appID(value: string) {
    this.set("appID", Value.fromString(value));
  }

  get permissions(): Array<string> {
    let value = this.get("permissions");
    return value.toStringArray();
  }

  set permissions(value: Array<string>) {
    this.set("permissions", Value.fromStringArray(value));
  }

  get managers(): Array<string> {
    let value = this.get("managers");
    return value.toStringArray();
  }

  set managers(value: Array<string>) {
    this.set("managers", Value.fromStringArray(value));
  }
}

export class KernelPermission extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save KernelPermission entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save KernelPermission entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("KernelPermission", id.toString(), this);
  }

  static load(id: string): KernelPermission | null {
    return store.get("KernelPermission", id) as KernelPermission | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appAddress(): string {
    let value = this.get("appAddress");
    return value.toString();
  }

  set appAddress(value: string) {
    this.set("appAddress", Value.fromString(value));
  }

  get entities(): Array<string> {
    let value = this.get("entities");
    return value.toStringArray();
  }

  set entities(value: Array<string>) {
    this.set("entities", Value.fromStringArray(value));
  }

  get role(): string {
    let value = this.get("role");
    return value.toString();
  }

  set role(value: string) {
    this.set("role", Value.fromString(value));
  }
}

export class KernelManagers extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save KernelManagers entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save KernelManagers entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("KernelManagers", id.toString(), this);
  }

  static load(id: string): KernelManagers | null {
    return store.get("KernelManagers", id) as KernelManagers | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get managesManageApps(): Bytes | null {
    let value = this.get("managesManageApps");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesManageApps(value: Bytes | null) {
    if (value === null) {
      this.unset("managesManageApps");
    } else {
      this.set("managesManageApps", Value.fromBytes(value as Bytes));
    }
  }
}

export class EVMScriptRegistry extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save EVMScriptRegistry entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save EVMScriptRegistry entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("EVMScriptRegistry", id.toString(), this);
  }

  static load(id: string): EVMScriptRegistry | null {
    return store.get("EVMScriptRegistry", id) as EVMScriptRegistry | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get baseAddress(): Bytes {
    let value = this.get("baseAddress");
    return value.toBytes();
  }

  set baseAddress(value: Bytes) {
    this.set("baseAddress", Value.fromBytes(value));
  }

  get appID(): Bytes {
    let value = this.get("appID");
    return value.toBytes();
  }

  set appID(value: Bytes) {
    this.set("appID", Value.fromBytes(value));
  }

  get upgradeable(): boolean {
    let value = this.get("upgradeable");
    return value.toBoolean();
  }

  set upgradeable(value: boolean) {
    this.set("upgradeable", Value.fromBoolean(value));
  }

  get defaultApp(): boolean {
    let value = this.get("defaultApp");
    return value.toBoolean();
  }

  set defaultApp(value: boolean) {
    this.set("defaultApp", Value.fromBoolean(value));
  }

  get permissions(): Array<string> {
    let value = this.get("permissions");
    return value.toStringArray();
  }

  set permissions(value: Array<string>) {
    this.set("permissions", Value.fromStringArray(value));
  }

  get managers(): Array<string> {
    let value = this.get("managers");
    return value.toStringArray();
  }

  set managers(value: Array<string>) {
    this.set("managers", Value.fromStringArray(value));
  }

  get executors(): Array<Bytes> {
    let value = this.get("executors");
    return value.toBytesArray();
  }

  set executors(value: Array<Bytes>) {
    this.set("executors", Value.fromBytesArray(value));
  }
}

export class EVMScriptRegistryPermission extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save EVMScriptRegistryPermission entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save EVMScriptRegistryPermission entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("EVMScriptRegistryPermission", id.toString(), this);
  }

  static load(id: string): EVMScriptRegistryPermission | null {
    return store.get(
      "EVMScriptRegistryPermission",
      id
    ) as EVMScriptRegistryPermission | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appAddress(): string {
    let value = this.get("appAddress");
    return value.toString();
  }

  set appAddress(value: string) {
    this.set("appAddress", Value.fromString(value));
  }

  get entities(): Array<string> {
    let value = this.get("entities");
    return value.toStringArray();
  }

  set entities(value: Array<string>) {
    this.set("entities", Value.fromStringArray(value));
  }

  get role(): string {
    let value = this.get("role");
    return value.toString();
  }

  set role(value: string) {
    this.set("role", Value.fromString(value));
  }
}

export class EVMScriptRegistryManagers extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save EVMScriptRegistryManagers entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save EVMScriptRegistryManagers entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("EVMScriptRegistryManagers", id.toString(), this);
  }

  static load(id: string): EVMScriptRegistryManagers | null {
    return store.get(
      "EVMScriptRegistryManagers",
      id
    ) as EVMScriptRegistryManagers | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get managesAddExecutor(): Bytes | null {
    let value = this.get("managesAddExecutor");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesAddExecutor(value: Bytes | null) {
    if (value === null) {
      this.unset("managesAddExecutor");
    } else {
      this.set("managesAddExecutor", Value.fromBytes(value as Bytes));
    }
  }

  get managesEnableAndDisableExecutors(): Bytes | null {
    let value = this.get("managesEnableAndDisableExecutors");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesEnableAndDisableExecutors(value: Bytes | null) {
    if (value === null) {
      this.unset("managesEnableAndDisableExecutors");
    } else {
      this.set(
        "managesEnableAndDisableExecutors",
        Value.fromBytes(value as Bytes)
      );
    }
  }
}

export class Vault extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Vault entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Vault entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Vault", id.toString(), this);
  }

  static load(id: string): Vault | null {
    return store.get("Vault", id) as Vault | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get baseAddress(): Bytes {
    let value = this.get("baseAddress");
    return value.toBytes();
  }

  set baseAddress(value: Bytes) {
    this.set("baseAddress", Value.fromBytes(value));
  }

  get appID(): Bytes {
    let value = this.get("appID");
    return value.toBytes();
  }

  set appID(value: Bytes) {
    this.set("appID", Value.fromBytes(value));
  }

  get upgradeable(): boolean {
    let value = this.get("upgradeable");
    return value.toBoolean();
  }

  set upgradeable(value: boolean) {
    this.set("upgradeable", Value.fromBoolean(value));
  }

  get defaultApp(): boolean {
    let value = this.get("defaultApp");
    return value.toBoolean();
  }

  set defaultApp(value: boolean) {
    this.set("defaultApp", Value.fromBoolean(value));
  }

  get permissions(): Array<string> {
    let value = this.get("permissions");
    return value.toStringArray();
  }

  set permissions(value: Array<string>) {
    this.set("permissions", Value.fromStringArray(value));
  }

  get managers(): Array<string> {
    let value = this.get("managers");
    return value.toStringArray();
  }

  set managers(value: Array<string>) {
    this.set("managers", Value.fromStringArray(value));
  }

  get transfers(): Array<string> {
    let value = this.get("transfers");
    return value.toStringArray();
  }

  set transfers(value: Array<string>) {
    this.set("transfers", Value.fromStringArray(value));
  }

  get deposits(): Array<string> {
    let value = this.get("deposits");
    return value.toStringArray();
  }

  set deposits(value: Array<string>) {
    this.set("deposits", Value.fromStringArray(value));
  }
}

export class VaultPermission extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VaultPermission entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VaultPermission entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VaultPermission", id.toString(), this);
  }

  static load(id: string): VaultPermission | null {
    return store.get("VaultPermission", id) as VaultPermission | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appAddress(): string {
    let value = this.get("appAddress");
    return value.toString();
  }

  set appAddress(value: string) {
    this.set("appAddress", Value.fromString(value));
  }

  get entities(): Array<string> {
    let value = this.get("entities");
    return value.toStringArray();
  }

  set entities(value: Array<string>) {
    this.set("entities", Value.fromStringArray(value));
  }

  get role(): string {
    let value = this.get("role");
    return value.toString();
  }

  set role(value: string) {
    this.set("role", Value.fromString(value));
  }
}

export class VaultManagers extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VaultManagers entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VaultManagers entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VaultManagers", id.toString(), this);
  }

  static load(id: string): VaultManagers | null {
    return store.get("VaultManagers", id) as VaultManagers | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get managesTransfers(): Bytes | null {
    let value = this.get("managesTransfers");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesTransfers(value: Bytes | null) {
    if (value === null) {
      this.unset("managesTransfers");
    } else {
      this.set("managesTransfers", Value.fromBytes(value as Bytes));
    }
  }
}

export class VaultTransferList extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VaultTransferList entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VaultTransferList entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VaultTransferList", id.toString(), this);
  }

  static load(id: string): VaultTransferList | null {
    return store.get("VaultTransferList", id) as VaultTransferList | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenAddress(): Array<Bytes> {
    let value = this.get("tokenAddress");
    return value.toBytesArray();
  }

  set tokenAddress(value: Array<Bytes>) {
    this.set("tokenAddress", Value.fromBytesArray(value));
  }

  get to(): Array<Bytes> {
    let value = this.get("to");
    return value.toBytesArray();
  }

  set to(value: Array<Bytes>) {
    this.set("to", Value.fromBytesArray(value));
  }

  get amount(): Array<BigInt> {
    let value = this.get("amount");
    return value.toBigIntArray();
  }

  set amount(value: Array<BigInt>) {
    this.set("amount", Value.fromBigIntArray(value));
  }
}

export class VaultDepositList extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VaultDepositList entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VaultDepositList entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VaultDepositList", id.toString(), this);
  }

  static load(id: string): VaultDepositList | null {
    return store.get("VaultDepositList", id) as VaultDepositList | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenAddress(): Array<Bytes> {
    let value = this.get("tokenAddress");
    return value.toBytesArray();
  }

  set tokenAddress(value: Array<Bytes>) {
    this.set("tokenAddress", Value.fromBytesArray(value));
  }

  get sender(): Array<Bytes> {
    let value = this.get("sender");
    return value.toBytesArray();
  }

  set sender(value: Array<Bytes>) {
    this.set("sender", Value.fromBytesArray(value));
  }

  get amount(): Array<BigInt> {
    let value = this.get("amount");
    return value.toBigIntArray();
  }

  set amount(value: Array<BigInt>) {
    this.set("amount", Value.fromBigIntArray(value));
  }
}

export class TokenManager extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TokenManager entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenManager entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenManager", id.toString(), this);
  }

  static load(id: string): TokenManager | null {
    return store.get("TokenManager", id) as TokenManager | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get baseAddress(): Bytes {
    let value = this.get("baseAddress");
    return value.toBytes();
  }

  set baseAddress(value: Bytes) {
    this.set("baseAddress", Value.fromBytes(value));
  }

  get appID(): Bytes {
    let value = this.get("appID");
    return value.toBytes();
  }

  set appID(value: Bytes) {
    this.set("appID", Value.fromBytes(value));
  }

  get upgradeable(): boolean {
    let value = this.get("upgradeable");
    return value.toBoolean();
  }

  set upgradeable(value: boolean) {
    this.set("upgradeable", Value.fromBoolean(value));
  }

  get defaultApp(): boolean {
    let value = this.get("defaultApp");
    return value.toBoolean();
  }

  set defaultApp(value: boolean) {
    this.set("defaultApp", Value.fromBoolean(value));
  }

  get permissions(): Array<string> {
    let value = this.get("permissions");
    return value.toStringArray();
  }

  set permissions(value: Array<string>) {
    this.set("permissions", Value.fromStringArray(value));
  }

  get managers(): Array<string> {
    let value = this.get("managers");
    return value.toStringArray();
  }

  set managers(value: Array<string>) {
    this.set("managers", Value.fromStringArray(value));
  }
}

export class TokenManagerManagers extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save TokenManagerManagers entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenManagerManagers entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenManagerManagers", id.toString(), this);
  }

  static load(id: string): TokenManagerManagers | null {
    return store.get("TokenManagerManagers", id) as TokenManagerManagers | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get managesAssign(): Bytes | null {
    let value = this.get("managesAssign");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesAssign(value: Bytes | null) {
    if (value === null) {
      this.unset("managesAssign");
    } else {
      this.set("managesAssign", Value.fromBytes(value as Bytes));
    }
  }

  get managesBurn(): Bytes | null {
    let value = this.get("managesBurn");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesBurn(value: Bytes | null) {
    if (value === null) {
      this.unset("managesBurn");
    } else {
      this.set("managesBurn", Value.fromBytes(value as Bytes));
    }
  }

  get managesIssue(): Bytes | null {
    let value = this.get("managesIssue");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesIssue(value: Bytes | null) {
    if (value === null) {
      this.unset("managesIssue");
    } else {
      this.set("managesIssue", Value.fromBytes(value as Bytes));
    }
  }

  get managesMint(): Bytes | null {
    let value = this.get("managesMint");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesMint(value: Bytes | null) {
    if (value === null) {
      this.unset("managesMint");
    } else {
      this.set("managesMint", Value.fromBytes(value as Bytes));
    }
  }

  get managesRevokeVestings(): Bytes | null {
    let value = this.get("managesRevokeVestings");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesRevokeVestings(value: Bytes | null) {
    if (value === null) {
      this.unset("managesRevokeVestings");
    } else {
      this.set("managesRevokeVestings", Value.fromBytes(value as Bytes));
    }
  }
}

export class TokenManagerPermission extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save TokenManagerPermission entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenManagerPermission entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenManagerPermission", id.toString(), this);
  }

  static load(id: string): TokenManagerPermission | null {
    return store.get(
      "TokenManagerPermission",
      id
    ) as TokenManagerPermission | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appAddress(): string {
    let value = this.get("appAddress");
    return value.toString();
  }

  set appAddress(value: string) {
    this.set("appAddress", Value.fromString(value));
  }

  get entities(): Array<string> {
    let value = this.get("entities");
    return value.toStringArray();
  }

  set entities(value: Array<string>) {
    this.set("entities", Value.fromStringArray(value));
  }

  get role(): string {
    let value = this.get("role");
    return value.toString();
  }

  set role(value: string) {
    this.set("role", Value.fromString(value));
  }
}

export class TokenHolder extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TokenHolder entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenHolder entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenHolder", id.toString(), this);
  }

  static load(id: string): TokenHolder | null {
    return store.get("TokenHolder", id) as TokenHolder | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenID(): string {
    let value = this.get("tokenID");
    return value.toString();
  }

  set tokenID(value: string) {
    this.set("tokenID", Value.fromString(value));
  }
}

export class Finance extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Finance entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Finance entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Finance", id.toString(), this);
  }

  static load(id: string): Finance | null {
    return store.get("Finance", id) as Finance | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get baseAddress(): Bytes {
    let value = this.get("baseAddress");
    return value.toBytes();
  }

  set baseAddress(value: Bytes) {
    this.set("baseAddress", Value.fromBytes(value));
  }

  get appID(): Bytes {
    let value = this.get("appID");
    return value.toBytes();
  }

  set appID(value: Bytes) {
    this.set("appID", Value.fromBytes(value));
  }

  get upgradeable(): boolean {
    let value = this.get("upgradeable");
    return value.toBoolean();
  }

  set upgradeable(value: boolean) {
    this.set("upgradeable", Value.fromBoolean(value));
  }

  get defaultApp(): boolean {
    let value = this.get("defaultApp");
    return value.toBoolean();
  }

  set defaultApp(value: boolean) {
    this.set("defaultApp", Value.fromBoolean(value));
  }

  get permissions(): Array<string> {
    let value = this.get("permissions");
    return value.toStringArray();
  }

  set permissions(value: Array<string>) {
    this.set("permissions", Value.fromStringArray(value));
  }

  get managers(): Array<string> {
    let value = this.get("managers");
    return value.toStringArray();
  }

  set managers(value: Array<string>) {
    this.set("managers", Value.fromStringArray(value));
  }

  get periods(): Array<string> {
    let value = this.get("periods");
    return value.toStringArray();
  }

  set periods(value: Array<string>) {
    this.set("periods", Value.fromStringArray(value));
  }

  get transactions(): Array<string> {
    let value = this.get("transactions");
    return value.toStringArray();
  }

  set transactions(value: Array<string>) {
    this.set("transactions", Value.fromStringArray(value));
  }
}

export class FinancePeriod extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save FinancePeriod entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save FinancePeriod entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("FinancePeriod", id.toString(), this);
  }

  static load(id: string): FinancePeriod | null {
    return store.get("FinancePeriod", id) as FinancePeriod | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appAddress(): Bytes {
    let value = this.get("appAddress");
    return value.toBytes();
  }

  set appAddress(value: Bytes) {
    this.set("appAddress", Value.fromBytes(value));
  }

  get starts(): BigInt {
    let value = this.get("starts");
    return value.toBigInt();
  }

  set starts(value: BigInt) {
    this.set("starts", Value.fromBigInt(value));
  }

  get ends(): BigInt {
    let value = this.get("ends");
    return value.toBigInt();
  }

  set ends(value: BigInt) {
    this.set("ends", Value.fromBigInt(value));
  }
}

export class FinanceTransaction extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save FinanceTransaction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save FinanceTransaction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("FinanceTransaction", id.toString(), this);
  }

  static load(id: string): FinanceTransaction | null {
    return store.get("FinanceTransaction", id) as FinanceTransaction | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appAddress(): Bytes {
    let value = this.get("appAddress");
    return value.toBytes();
  }

  set appAddress(value: Bytes) {
    this.set("appAddress", Value.fromBytes(value));
  }

  get incoming(): boolean {
    let value = this.get("incoming");
    return value.toBoolean();
  }

  set incoming(value: boolean) {
    this.set("incoming", Value.fromBoolean(value));
  }

  get entity(): Bytes {
    let value = this.get("entity");
    return value.toBytes();
  }

  set entity(value: Bytes) {
    this.set("entity", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get reference(): string | null {
    let value = this.get("reference");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set reference(value: string | null) {
    if (value === null) {
      this.unset("reference");
    } else {
      this.set("reference", Value.fromString(value as string));
    }
  }

  get kind(): string {
    let value = this.get("kind");
    return value.toString();
  }

  set kind(value: string) {
    this.set("kind", Value.fromString(value));
  }

  get investment(): string {
    let value = this.get("investment");
    return value.toString();
  }

  set investment(value: string) {
    this.set("investment", Value.fromString(value));
  }
}

export class FinancePermission extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save FinancePermission entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save FinancePermission entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("FinancePermission", id.toString(), this);
  }

  static load(id: string): FinancePermission | null {
    return store.get("FinancePermission", id) as FinancePermission | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appAddress(): string {
    let value = this.get("appAddress");
    return value.toString();
  }

  set appAddress(value: string) {
    this.set("appAddress", Value.fromString(value));
  }

  get entities(): Array<string> {
    let value = this.get("entities");
    return value.toStringArray();
  }

  set entities(value: Array<string>) {
    this.set("entities", Value.fromStringArray(value));
  }

  get role(): string {
    let value = this.get("role");
    return value.toString();
  }

  set role(value: string) {
    this.set("role", Value.fromString(value));
  }
}

export class FinanceManagers extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save FinanceManagers entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save FinanceManagers entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("FinanceManagers", id.toString(), this);
  }

  static load(id: string): FinanceManagers | null {
    return store.get("FinanceManagers", id) as FinanceManagers | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get managesChangeBudget(): Bytes | null {
    let value = this.get("managesChangeBudget");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesChangeBudget(value: Bytes | null) {
    if (value === null) {
      this.unset("managesChangeBudget");
    } else {
      this.set("managesChangeBudget", Value.fromBytes(value as Bytes));
    }
  }

  get managesChangePeriod(): Bytes | null {
    let value = this.get("managesChangePeriod");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesChangePeriod(value: Bytes | null) {
    if (value === null) {
      this.unset("managesChangePeriod");
    } else {
      this.set("managesChangePeriod", Value.fromBytes(value as Bytes));
    }
  }

  get managesCreatePayments(): Bytes | null {
    let value = this.get("managesCreatePayments");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesCreatePayments(value: Bytes | null) {
    if (value === null) {
      this.unset("managesCreatePayments");
    } else {
      this.set("managesCreatePayments", Value.fromBytes(value as Bytes));
    }
  }

  get managesManagePayments(): Bytes | null {
    let value = this.get("managesManagePayments");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesManagePayments(value: Bytes | null) {
    if (value === null) {
      this.unset("managesManagePayments");
    } else {
      this.set("managesManagePayments", Value.fromBytes(value as Bytes));
    }
  }

  get managesExecutePayments(): Bytes | null {
    let value = this.get("managesExecutePayments");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesExecutePayments(value: Bytes | null) {
    if (value === null) {
      this.unset("managesExecutePayments");
    } else {
      this.set("managesExecutePayments", Value.fromBytes(value as Bytes));
    }
  }
}

export class Voting extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Voting entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Voting entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Voting", id.toString(), this);
  }

  static load(id: string): Voting | null {
    return store.get("Voting", id) as Voting | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get baseAddress(): Bytes {
    let value = this.get("baseAddress");
    return value.toBytes();
  }

  set baseAddress(value: Bytes) {
    this.set("baseAddress", Value.fromBytes(value));
  }

  get appID(): Bytes {
    let value = this.get("appID");
    return value.toBytes();
  }

  set appID(value: Bytes) {
    this.set("appID", Value.fromBytes(value));
  }

  get upgradeable(): boolean {
    let value = this.get("upgradeable");
    return value.toBoolean();
  }

  set upgradeable(value: boolean) {
    this.set("upgradeable", Value.fromBoolean(value));
  }

  get defaultApp(): boolean {
    let value = this.get("defaultApp");
    return value.toBoolean();
  }

  set defaultApp(value: boolean) {
    this.set("defaultApp", Value.fromBoolean(value));
  }

  get supportRequiredPercent(): BigInt | null {
    let value = this.get("supportRequiredPercent");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set supportRequiredPercent(value: BigInt | null) {
    if (value === null) {
      this.unset("supportRequiredPercent");
    } else {
      this.set("supportRequiredPercent", Value.fromBigInt(value as BigInt));
    }
  }

  get minQuorumPercent(): BigInt | null {
    let value = this.get("minQuorumPercent");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set minQuorumPercent(value: BigInt | null) {
    if (value === null) {
      this.unset("minQuorumPercent");
    } else {
      this.set("minQuorumPercent", Value.fromBigInt(value as BigInt));
    }
  }

  get permissions(): Array<string> {
    let value = this.get("permissions");
    return value.toStringArray();
  }

  set permissions(value: Array<string>) {
    this.set("permissions", Value.fromStringArray(value));
  }

  get managers(): Array<string> {
    let value = this.get("managers");
    return value.toStringArray();
  }

  set managers(value: Array<string>) {
    this.set("managers", Value.fromStringArray(value));
  }

  get votes(): Array<string> {
    let value = this.get("votes");
    return value.toStringArray();
  }

  set votes(value: Array<string>) {
    this.set("votes", Value.fromStringArray(value));
  }
}

export class Vote extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Vote entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Vote entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Vote", id.toString(), this);
  }

  static load(id: string): Vote | null {
    return store.get("Vote", id) as Vote | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appAddress(): Bytes {
    let value = this.get("appAddress");
    return value.toBytes();
  }

  set appAddress(value: Bytes) {
    this.set("appAddress", Value.fromBytes(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    return value.toBytes();
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get metadata(): string {
    let value = this.get("metadata");
    return value.toString();
  }

  set metadata(value: string) {
    this.set("metadata", Value.fromString(value));
  }

  get reason(): string {
    let value = this.get("reason");
    return value.toString();
  }

  set reason(value: string) {
    this.set("reason", Value.fromString(value));
  }

  get supporters(): Array<Bytes> {
    let value = this.get("supporters");
    return value.toBytesArray();
  }

  set supporters(value: Array<Bytes>) {
    this.set("supporters", Value.fromBytesArray(value));
  }

  get supportersStake(): Array<BigInt> {
    let value = this.get("supportersStake");
    return value.toBigIntArray();
  }

  set supportersStake(value: Array<BigInt>) {
    this.set("supportersStake", Value.fromBigIntArray(value));
  }

  get nonSupporters(): Array<Bytes> {
    let value = this.get("nonSupporters");
    return value.toBytesArray();
  }

  set nonSupporters(value: Array<Bytes>) {
    this.set("nonSupporters", Value.fromBytesArray(value));
  }

  get nonSupportersStake(): Array<BigInt> {
    let value = this.get("nonSupportersStake");
    return value.toBigIntArray();
  }

  set nonSupportersStake(value: Array<BigInt>) {
    this.set("nonSupportersStake", Value.fromBigIntArray(value));
  }

  get executed(): boolean {
    let value = this.get("executed");
    return value.toBoolean();
  }

  set executed(value: boolean) {
    this.set("executed", Value.fromBoolean(value));
  }

  get executionBlock(): BigInt | null {
    let value = this.get("executionBlock");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set executionBlock(value: BigInt | null) {
    if (value === null) {
      this.unset("executionBlock");
    } else {
      this.set("executionBlock", Value.fromBigInt(value as BigInt));
    }
  }
}

export class VotingPermission extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VotingPermission entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VotingPermission entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VotingPermission", id.toString(), this);
  }

  static load(id: string): VotingPermission | null {
    return store.get("VotingPermission", id) as VotingPermission | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get appAddress(): string {
    let value = this.get("appAddress");
    return value.toString();
  }

  set appAddress(value: string) {
    this.set("appAddress", Value.fromString(value));
  }

  get entities(): Array<string> {
    let value = this.get("entities");
    return value.toStringArray();
  }

  set entities(value: Array<string>) {
    this.set("entities", Value.fromStringArray(value));
  }

  get role(): string {
    let value = this.get("role");
    return value.toString();
  }

  set role(value: string) {
    this.set("role", Value.fromString(value));
  }
}

export class VotingManagers extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VotingManagers entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VotingManagers entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VotingManagers", id.toString(), this);
  }

  static load(id: string): VotingManagers | null {
    return store.get("VotingManagers", id) as VotingManagers | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get managesCreateVotes(): Bytes | null {
    let value = this.get("managesCreateVotes");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesCreateVotes(value: Bytes | null) {
    if (value === null) {
      this.unset("managesCreateVotes");
    } else {
      this.set("managesCreateVotes", Value.fromBytes(value as Bytes));
    }
  }

  get managesModifyQuorum(): Bytes | null {
    let value = this.get("managesModifyQuorum");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesModifyQuorum(value: Bytes | null) {
    if (value === null) {
      this.unset("managesModifyQuorum");
    } else {
      this.set("managesModifyQuorum", Value.fromBytes(value as Bytes));
    }
  }

  get managesModifySupport(): Bytes | null {
    let value = this.get("managesModifySupport");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set managesModifySupport(value: Bytes | null) {
    if (value === null) {
      this.unset("managesModifySupport");
    } else {
      this.set("managesModifySupport", Value.fromBytes(value as Bytes));
    }
  }
}
