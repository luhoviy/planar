import { User } from './user.model';

export interface AccountAuthData {
  accessToken?: string;
  user: User;
}
