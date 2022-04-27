import Web3 from 'web3';

// Refer to API documentation for more details:
// MetaMask - https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents
// Web3 - https://web3js.readthedocs.io/en/v1.7.1/web3-eth.html

declare global {
  interface Window {
    ethereum: any;
  }
}

export class Metamask {
  public readonly isAvailable: boolean;
  public readonly instance = new Web3(null).eth;

  constructor(isClientSide: boolean) {
    this.isAvailable = isClientSide ? !!window.ethereum : false;
    isClientSide ? (this.instance = new Web3(window.ethereum).eth) : void 0;
  }
}
