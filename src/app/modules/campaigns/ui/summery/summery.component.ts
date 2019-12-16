import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html'
})
export class SummeryComponent {
  titleBudget = 'Daily Budget: ';
  titleBid = 'Bid: ';
  titleSD = 'Start Date: ';
  titleED = 'End Date: ';
  titleDevices = 'Devices: ';
  devices: string[];
  
  @Input() campaign;
}
