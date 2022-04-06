import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

// Refer to API documentation for more details:
// MetaMask - https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents
// Web3 - https://web3js.readthedocs.io/en/v1.7.1/web3-eth.html

// Check is MetaMask API available
export const IS_METAMASK_AVAILABLE = !!window.ethereum;

// Create an instance
export const METAMASK = new Web3(window.ethereum).eth;
