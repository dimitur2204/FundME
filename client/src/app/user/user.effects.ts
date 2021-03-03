import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
import * as UserActions from './user.actions';
import { ContractService } from '../contract.service';

@Injectable()
export class UserEffects {
  connect$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(UserActions.connectUser),
        switchMap(async () => await this.contractService.connectAccount()),
        map((response: any) => {
          localStorage.setItem('user', JSON.stringify(response));
          return UserActions.connectUserSuccess({ user: response });
        })
      )
  );

  constructor(
    private actions$: Actions,
    private contractService: ContractService
  ) {}
}
