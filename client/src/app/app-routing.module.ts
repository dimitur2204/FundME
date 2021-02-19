import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCampaignComponent } from './campaign/new-campaign/new-campaign.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'campaign',
    children: [
      {
        path: 'new',
        component: NewCampaignComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
