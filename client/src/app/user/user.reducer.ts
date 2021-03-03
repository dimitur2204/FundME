import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user: string;
  connected: boolean;
}

export const initialState: UserState = {
  user: '',
  connected: false,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.connectUser, (state) => state),

  on(UserActions.connectUserSuccess, (state, { user }) => ({
    ...state,
    user,
    connected: true,
  })),

  on(UserActions.connectUserFailure, (state, action) => state)
);

export const userAccountId = (state: UserState) => state.user[0];
export const connectionStatus = (state: UserState) => state.connected;
