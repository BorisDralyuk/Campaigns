import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignsPageComponent } from './layout/campaigns-page/campaigns-page.component';
import { AllCampaignsComponent } from './components/all-campaigns/all-campaigns.component';
import { CampaignFormComponent } from './components/campaign-form/campaign-form.component';
import { CanDeactivateGuard } from './shared/can-deactivate.guard';

const routes: Routes = [
  {
    path: '', component: CampaignsPageComponent
    , children:
      [
        { path: '', redirectTo: 'all', pathMatch: 'full' },
        { path: 'all', component: AllCampaignsComponent },
        { path: 'new', component: CampaignFormComponent, canDeactivate: [CanDeactivateGuard] },
        { path: ':id', component: CampaignFormComponent, canDeactivate: [CanDeactivateGuard] },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
