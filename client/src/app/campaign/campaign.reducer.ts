import { Action, createReducer, on } from '@ngrx/store';
import * as CampaignActions from './campaign.actions';

export const campaignsFeatureKey = 'campaigns';

export interface CampaignState {
  campaigns: String[];
}

export const initialState: CampaignState = {
  campaigns: [],
};

export const reducer = createReducer(
  initialState,
  on(CampaignActions.loadCampaigns, (state) => state),
  on(CampaignActions.loadCampaignsSuccess, (state, { campaigns }) => ({
    ...state,
    campaigns,
  }))
);

export const campaigns = (state: CampaignState) => state.campaigns;
