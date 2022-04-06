import { Authority } from './enums';

export interface BaseUser {
  readonly publicAddress: string;
  readonly authority: Authority;
  username: string;
}

export interface User extends BaseUser {
  avatarUri: string;
  bio: string;
  appraiserAura: number;
  creatorAura: number;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  nonce: number;
  leadersCount: number;
  subscribersCount: number;
}
