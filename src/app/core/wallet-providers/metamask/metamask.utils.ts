import { MetamaskError, MetamaskErrorCode } from './models';

export function transformMetamaskErrorMessage(error: MetamaskError): string {
  switch (error.code) {
    case MetamaskErrorCode.CANCELED_BY_USER:
      return 'Canceled by user.';
    case MetamaskErrorCode.ALREADY_PROCESSING:
      return 'Already processing. Please open MetaMask to proceed.';
    default:
      return error.message;
  }
}
