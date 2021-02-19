import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { FactoryService } from '../factory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  campaigns: Observable<any>;

  constructor(private factory: FactoryService) {
    this.campaigns = from(
      this.factory.instance.methods.getDeployedCampaigns().call()
    );
  }

  ngOnInit(): void {}
}
