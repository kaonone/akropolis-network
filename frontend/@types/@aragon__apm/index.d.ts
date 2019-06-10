
// tslint:disable:max-classes-per-file
declare module '@aragon/apm' {
  import Web3 from 'web3';
  import ABI from 'web3/eth/abi';

  export interface IpfsConfig {
    gateway: string;
  }

  export interface ApmOptions {
    ensRegistryAddress: string;
    ipfs: IpfsConfig;
  }

  export interface Apm {
    getLatestVersion(ensId: string): Promise<{
      contractAddress?: string;
      abi?: any[];
    }>;
  }

  function getApm(web3: Web3, options: ApmOptions): Apm;

  export default getApm;
}
