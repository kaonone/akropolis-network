import { Provider, ProviderType } from 'shared/types/models';

// https://ethereum.stackexchange.com/questions/24266/elegant-way-to-detect-current-provider-int-web3-js
export function getCurrentProviderType(): ProviderType {
  if (!window.web3) {
    return 'unknown';
  }

  if (window.web3.currentProvider.isMetaMask) {
    return 'metamask';
  }

  if (window.web3.currentProvider.isTrust) {
    return 'trust';
  }

  if (window.web3.currentProvider.isToshi) {
    return 'toshi';
  }

  if (typeof window.__CIPHER__ !== 'undefined') {
    return 'cipher';
  }

  if (window.web3.currentProvider.constructor.name === 'EthereumProvider') {
    return 'mist';
  }

  if (window.web3.currentProvider.constructor.name === 'Web3FrameProvider') {
    return 'parity';
  }

  if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1) {
    return 'infura';
  }

  if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1) {
    return 'localhost';
  }

  return 'unknown';
}

/*
 * Return the injected provider, if any.
 */
export function getInjectedProvider(): Provider | null {
  if (window.web3 && window.web3.currentProvider) {
    return window.web3.currentProvider;
  }
  return null;
}

/*
 * This utils library is meant to capture all of the web3-related utilities
 * that we use. Any utilities we need from web3-utils should be re-exported
 * from this file.
 */
import Web3 from 'web3';
import BN from 'bn.js';
import { InvalidNetworkType, InvalidURI, NoConnection } from './errors';
import { isElectron } from './utils';
import { HttpProvider } from 'web3/providers';

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Check address equality without checksums
 * @param {string} first First address
 * @param {string} second Second address
 * @returns {boolean} Address equality
 */
export function addressesEqual(first: string, second: string): boolean {
  first = first && first.toLowerCase();
  second = second && second.toLowerCase();
  return first === second;
}

const websocketRegex = /^wss?:\/\/.+/;

/**
 * Check if the ETH node at the given URI is compatible for the current environment
 * @param {string} uri URI of the ETH node.
 * @param {string} expectedNetworkType The expected network type of the ETH node.
 * @returns {Promise} Resolves if the ETH node is compatible, otherwise throws:
 *    - InvalidURI: URI given is not compatible (e.g. must be WebSockets)
 *    - InvalidNetworkType: ETH node connected to wrong network
 *    - NoConnection: Couldn't connect to URI
 */
export async function checkValidEthNode(uri: string, expectedNetworkType: string): Promise<any> {
  // Must be websocket connection
  if (!websocketRegex.test(uri)) {
    throw new InvalidURI('The URI must use the WebSocket protocol');
  }

  try {
    const web3 = new Web3(uri);
    // TODO ds: remove 'as any' after web3 updating
    const connectedNetworkType = await (web3.eth.net as any).getNetworkType();
    if (((provider: any): provider is HttpProvider => provider.disconnect)(web3.currentProvider)) {
      (web3.currentProvider as any).disconnect(); // TODO ds: remove 'as any' after web3 updating
    } else {
      // Older versions of web3's providers didn't expose a generic interface for disconnecting
      (web3.currentProvider as any).connection.close();
    }

    if (connectedNetworkType !== expectedNetworkType) {
      throw new InvalidNetworkType();
    }
  } catch (err) {
    if (err instanceof InvalidNetworkType) {
      throw err;
    }
    throw new NoConnection();
  }

  return true;
}

/**
 * Format the balance to a fixed number of decimals
 *
 * @param {BN} amount The total amount.
 * @param {object} options The options object.
 * @param {BN} options.base The decimals base.
 * @param {number} options.precision Number of decimals to format.
 *
 * @returns {string} The formatted balance.
 */
export function formatBalance(
  amount: BN,
  { base = new BN(10).pow(new BN(18)), precision = 2 } = {},
): string {
  const baseLength = base.toString().length;

  const whole = amount.div(base).toString();
  let fraction = amount.mod(base).toString();
  const zeros = '0'.repeat(Math.max(0, baseLength - fraction.length - 1));
  fraction = `${zeros}${fraction}`.replace(/0+$/, '').slice(0, precision);

  if (fraction === '' || parseInt(fraction, 10) === 0) {
    return whole;
  }

  return `${whole}.${fraction}`;
}

export function getEmptyAddress() {
  return EMPTY_ADDRESS;
}

// Get the first account of a web3 instance
export async function getMainAccount(web3: Web3): Promise<string | null> {
  try {
    const accounts = await web3.eth.getAccounts();
    return (accounts && accounts[0]) || null;
  } catch (err) {
    return null;
  }
}

export function getUnknownBalance() {
  return new BN('-1');
}

// Cache web3 instances used in the app
const web3Cache = new WeakMap<Provider, Web3>();

/**
 * Get cached web3 instance
 * @param {Web3.Provider} provider Web3 provider
 * @returns {Web3} The web3 instance
 */
export function getWeb3(provider: Provider): Web3 {
  if (web3Cache.has(provider)) {
    return web3Cache.get(provider) as Web3;
  }
  const web3 = new Web3(provider);
  web3Cache.set(provider, web3);
  return web3;
}

// Returns an identifier for the provider, if it can be detected
export function identifyProvider(provider: Provider) {
  if (provider && isElectron()) {
    return 'frame';
  }
  if (provider && (provider as any).isMetaMask) {
    return 'metamask';
  }
  return 'unknown';
}

export function isConnected(provider: Provider) {
  // EIP-1193 compliant providers may not include `isConnected()`, but most should support it for
  // the foreseeable future to be backwards compatible with older Web3.js implementations.
  // The `status` property is also not required by EIP-1193, but is often set on providers for
  // backwards compatibility as well.
  return typeof (provider as any).isConnected === 'function'
    ? (provider as any).isConnected()
    : (provider as any).status === 'connected';
}

// Check if the address represents an empty address
export function isEmptyAddress(address: string) {
  return addressesEqual(address, EMPTY_ADDRESS);
}

export function isValidEnsName(name: string) {
  return /^([\w-]+\.)+eth$/.test(name);
}

/**
 * Shorten an Ethereum address. `charsLength` allows to change the number of
 * characters on both sides of the ellipsis.
 *
 * Examples:
 *   shortenAddress('0x19731977931271')    // 0x1973…1271
 *   shortenAddress('0x19731977931271', 2) // 0x19…71
 *   shortenAddress('0x197319')            // 0x197319 (already short enough)
 *
 * @param {string} address The address to shorten
 * @param {number} [charsLength=4] The number of characters to change on both sides of the ellipsis
 * @returns {string} The shortened address
 */
export function shortenAddress(address: string, charsLength: number = 4): string {
  const prefixLength = 2; // "0x"
  if (!address) {
    return '';
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address;
  }
  return (
    address.slice(0, charsLength + prefixLength) +
    '…' +
    address.slice(-charsLength)
  );
}

// Re-export some utilities from web3-utils
export { fromWei, isAddress, toChecksumAddress, toWei } from 'web3-utils';
