import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaignService } from '../../shared/campaign.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Campaign } from '../../shared/interfaces';

@Component({
  selector: 'app-all-campaigns',
  templateUrl: './all-campaigns.component.html'
})
export class AllCampaignsComponent implements OnInit, OnDestroy {

  title = 'All campaigns';
  loading: boolean;
  data: Campaign[];
  campaignSub: Subscription;
  displayedColumns: string[];

  constructor(
    private campaignService: CampaignService,
    private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.displayedColumns = ['$key', 'name', 'startDate', 'devices', 'endDate', 'budget', 'bid', 'edit']
    this.campaignSub = this.campaignService.getData()
      .subscribe((data: Campaign[]) => {
        this.data = data;
        this.loading = false;
      })
  }

  ngOnDestroy() {
    if (this.campaignSub)
      this.campaignSub.unsubscribe()
  }

  isEdit(key: string){
    this.router.navigate([`/campaigns/${key}`])
  }

  isCreate(){
     this.router.navigate(['/campaigns/new'])
  }

}
