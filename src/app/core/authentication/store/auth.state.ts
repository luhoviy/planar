import { User } from '../models/user.model';

export interface AuthState {
  readonly user: User;
  readonly accessToken: string;
  readonly initialLoginChecked: boolean;
}

export const initialState: AuthState = {
  user: null,
  accessToken: null,
  initialLoginChecked: false
};
