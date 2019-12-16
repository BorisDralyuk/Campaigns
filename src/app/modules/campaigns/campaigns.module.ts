import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseModule } from '../../shared/modules/firebase/firebase.module';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { DatepickerModule } from '../../shared/modules/datepicker/datepicker.module';

import { CampaignsPageComponent } from './layout/campaigns-page/campaigns-page.component';
import { AllCampaignsComponent } from './components/all-campaigns/all-campaigns.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { CampaignFormComponent } from './components/campaign-form/campaign-form.component';
import { StepperComponent } from './ui/stepper/stepper.component';
import { TargetingComponent } from './ui/targeting/targeting.component';
import { SegmentComponent } from './ui/segment/segment.component';
import { SummeryComponent } from './ui/summery/summery.component';
import { TableCampaignsComponent } from './ui/table-campaigns/table-campaigns.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';


@NgModule({
  declarations: [
    CampaignsPageComponent,
    StepperComponent,
    TargetingComponent,
    SegmentComponent,
    SummeryComponent,
    AllCampaignsComponent,
    LoaderComponent,
    CampaignFormComponent,
    TableCampaignsComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CampaignsRoutingModule,
    MaterialModule,
    DatepickerModule,
    FirebaseModule,
  ],
  entryComponents: [ModalComponent],
  providers: [],
  bootstrap: []
})
export class CampaignsModule { }
