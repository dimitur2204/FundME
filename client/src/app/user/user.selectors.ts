import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey
);

export const selectUserAccountId = createSelector(
  selectUserState,
  fromUser.userAccountId
);

export const selectConnectionStatus = createSelector(
  selectUserState,
  fromUser.connectionStatus
);
