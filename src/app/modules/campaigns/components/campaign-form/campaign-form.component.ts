import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Subscription, Observable } from 'rxjs';
import { CampaignService } from '../../shared/campaign.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Campaign } from '../../shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html'
})
export class CampaignFormComponent implements OnInit, OnDestroy {

  isNew = true;
  title = this.isNew ? 'Create campaign' : 'Edit campaign';
  campaign: Campaign;
  alldevices: string[];
  loading: boolean;
  campSub: Subscription;
  changedForm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private message: MessageService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true
    this.campSub = this.campaignService.getDevices()
      .pipe(
        switchMap(d => {
          this.alldevices = d;
          return this.route.params
            .pipe(
              switchMap((params: Params) => {
                if (params['id']) {
                  this.isNew = false;
                  return this.campaignService.getCampaignById(params['id'])
                } else {
                  this.isNew = true;
                  return of(new Campaign())
                }
              })
            )
        }))
      .subscribe(campaign => {
        this.campaign = campaign as Campaign;
        this.loading = false
      })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changedForm) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '500px',
        data: { title: 'Your changes are unsaved!! Do you like to exit' }
      });
      return dialogRef.afterClosed()
    }
    return true;
  }


  ngOnDestroy() {
    if (this.campSub)
      this.campSub.unsubscribe()
  }

  setName(value: string) {
    this.changedForm = true;
    this.campaign.name = value;
  }

  setBudget(value: number) {
    this.changedForm = true;
    this.campaign.budget = value;
  }

  setBid(value: number) {
    this.changedForm = true;
    this.campaign.bid = value;
  }

  setStartDate(value: number) {
    this.changedForm = true;
    this.campaign.startDate = new Date(value).valueOf();
  }

  setEndDate(value: number) {
    this.changedForm = true;
    this.campaign.endDate = value;
  }

  setDevices(value: string[]) {
    this.changedForm = true;
    this.campaign.devices = value;
  }

  onSubmit(e) {
    this.changedForm = false;
    if (!this.isNew) {
      this.campaignService.updateCampaign(e)
        .then(d => {
          this.message.openSnackBar('Update campaign success!', '', true);
          this.router.navigate(['/campaigns']);
        })
        .catch(err => {
          this.message.openSnackBar(err.message, '', false);
        })
    } else {
      this.campaignService.insertCampaign(e)
        .then(d => {
          this.message.openSnackBar('Add campaign success!', '', true);
          this.router.navigate(['/campaigns']);
        })
        .catch(err => {
          this.message.openSnackBar(err.message, '', false);
        })
    }
  }

}
