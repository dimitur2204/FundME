import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user/user.effects';
import * as fromUser from './user/user.reducer';
import * as fromCampaign from './campaign/campaign.reducer';
import { CampaignEffects } from './campaign/campaign.effects';
import { HeaderComponent } from './shared/header/header.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { HomeComponent } from './shared/home/home.component';
import { CampaignCreateComponent } from './campaign/campaign-create/campaign-create.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CampaignDetailsComponent } from './campaign/campaign-details/campaign-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CampaignListComponent,
    HomeComponent,
    CampaignCreateComponent,
    CampaignDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forFeature([UserEffects, CampaignEffects]),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    StoreModule.forFeature(
      fromCampaign.campaignsFeatureKey,
      fromCampaign.reducer
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
