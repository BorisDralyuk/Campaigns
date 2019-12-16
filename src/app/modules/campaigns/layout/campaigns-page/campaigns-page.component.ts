import { Component } from '@angular/core';

@Component({
  selector: 'app-campaigns-page',
  templateUrl: './campaigns-page.component.html'
})
export class CampaignsPageComponent {
  newCampaign = 'Create campaign';
  allCampaigns = 'Campaigns';
  logout = 'Logout';
 }
