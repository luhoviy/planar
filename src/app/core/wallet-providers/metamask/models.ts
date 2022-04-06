export enum MetamaskErrorCode {
  CANCELED_BY_USER = 4001,
  ALREADY_PROCESSING = -32002
}

export interface MetamaskError extends Error {
  code: number | MetamaskErrorCode;
}
