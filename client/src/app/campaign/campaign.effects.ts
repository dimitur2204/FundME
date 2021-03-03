import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ContractService } from '../contract.service';
import * as CampaignActions from './campaign.actions';

@Injectable()
export class CampaignEffects {
  fetchCampaigns$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(CampaignActions.loadCampaigns),
        switchMap(() => this.contractService.getDeployedCampaigns()),
        map((campaigns) => {
          return CampaignActions.loadCampaignsSuccess({ campaigns });
        })
      )
  );

  constructor(
    private actions$: Actions,
    private contractService: ContractService
  ) {}
}
