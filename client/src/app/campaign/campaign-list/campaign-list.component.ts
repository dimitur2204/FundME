import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { mergeAll, scan } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { loadCampaigns } from '../campaign.actions';
import { selectCampaigns } from '../campaign.selectors';

@Component({
  selector: 'app-campaign-list',
  styleUrls: ['campaign-list.component.scss'],
  templateUrl: 'campaign-list.component.html',
})
export class CampaignListComponent implements OnInit {
  displayedColumns: string[] = ['campaign'];
  dataSource;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(loadCampaigns());
    this.dataSource = this.store.pipe(
      select(selectCampaigns),
      mergeAll(),
      scan((acc: any[], value) => {
        acc.push({ campaign: value });
        return acc;
      }, [])
    );
  }
}
