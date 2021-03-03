import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { loadCampaigns } from '../campaign.actions';
import { selectCampaigns } from '../campaign.selectors';

// const ELEMENT_DATA = [
//   {
//     address: '0x48965416fa7sd98f7198af23s14df5',
//     approvers: 45,
//     balance: 550,
//     requests: 3,
//   },
//   {
//     address: '0xasfdgawe525352agsdr2q35asgdsf5',
//     approvers: 45,
//     balance: 100,
//     requests: 3,
//   },
//   {
//     address: '0x4896541asdgaw46azfh4tersatret4',
//     approvers: 45,
//     balance: 0.55,
//     requests: 3,
//   },
// ];

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
      map((campaign) => {
        return [{ campaign: campaign[0] }];
      })
    );
  }
}
