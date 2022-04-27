import { InjectionToken } from '@angular/core';
import { Metamask } from '../models/metamask.model';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const METAMASK = new InjectionToken<Metamask>('Metamask');

export function MetamaskFactory(isClientSide: boolean): () => Metamask {
  return () => new Metamask(isClientSide);
}
