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

export class DeployDAO extends EthereumEvent {
  get params(): DeployDAOParams {
    return new DeployDAOParams(this);
  }
}

export class DeployDAOParams {
  _event: DeployDAO;

  constructor(event: DeployDAO) {
    this._event = event;
  }

  get dao(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class DeployEVMScriptRegistry extends EthereumEvent {
  get params(): DeployEVMScriptRegistryParams {
    return new DeployEVMScriptRegistryParams(this);
  }
}

export class DeployEVMScriptRegistryParams {
  _event: DeployEVMScriptRegistry;

  constructor(event: DeployEVMScriptRegistry) {
    this._event = event;
  }

  get reg(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class DAOFactory extends SmartContract {
  static bind(address: Address): DAOFactory {
    return new DAOFactory("DAOFactory", address);
  }

  baseACL(): Address {
    let result = super.call("baseACL", []);
    return result[0].toAddress();
  }

  regFactory(): Address {
    let result = super.call("regFactory", []);
    return result[0].toAddress();
  }

  baseKernel(): Address {
    let result = super.call("baseKernel", []);
    return result[0].toAddress();
  }
}
