import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { connectUser } from 'src/app/user/user.actions';
import { selectConnectionStatus } from 'src/app/user/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  connected$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.connected$ = this.store.pipe(select(selectConnectionStatus));
  }

  ngOnInit(): void {}

  onClick(): void {
    this.store.dispatch(connectUser());
  }
}
