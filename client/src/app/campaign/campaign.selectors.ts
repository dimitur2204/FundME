import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCampaign from './campaign.reducer';

export const selectCampaignState = createFeatureSelector<fromCampaign.CampaignState>(
  fromCampaign.campaignsFeatureKey
);

export const selectCampaigns = createSelector(
  selectCampaignState,
  fromCampaign.campaigns
);
