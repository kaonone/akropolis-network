declare module 'eth-provider' {
  import Web3 from 'web3';

  type Provider = typeof Web3.givenProvider;

  type PresetTargets = 'injected' | 'frame' | 'direct' | 'infura' | 'infuraRinkeby' | 'infuraRopsten' | 'infuraKovan';
  type Target = PresetTargets | string

  function makeProvider(targets: Target | Target[]): Provider;
  export default makeProvider;
}
