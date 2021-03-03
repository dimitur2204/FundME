import { createAction, props } from '@ngrx/store';

export const loadCampaigns = createAction('[Campaign] Load Campaigns');

export const loadCampaignsSuccess = createAction(
  '[Campaign] Load Campaigns Success',
  props<{ campaigns: String[] }>()
);

export const loadCampaignsFailure = createAction(
  '[Campaign] Load Campaigns Failure',
  props<{ error: any }>()
);
