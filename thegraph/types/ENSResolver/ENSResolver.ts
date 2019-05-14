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

export class ClaimSubdomain extends EthereumEvent {
  get params(): ClaimSubdomainParams {
    return new ClaimSubdomainParams(this);
  }
}

export class ClaimSubdomainParams {
  _event: ClaimSubdomain;

  constructor(event: ClaimSubdomain) {
    this._event = event;
  }

  get subnode(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get resolver(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class ENSResolver extends SmartContract {
  static bind(address: Address): ENSResolver {
    return new ENSResolver("ENSResolver", address);
  }

  rootNode(): Bytes {
    let result = super.call("rootNode", []);
    return result[0].toBytes();
  }
}
