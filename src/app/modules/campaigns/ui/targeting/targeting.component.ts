import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-targeting',
  templateUrl: './targeting.component.html'
})
export class TargetingComponent implements OnInit {

  errorNameReruired = 'Name is required';
  errorBudgetReruired = 'Budget is required';
  errorBudgetCount = 'The Daily Budget must be at least 10 times higher than Bid';
  errorBidReruired = 'Bid is required';
  errorDateValid = 'Enter a valid date';

  startDateInvalid = false;
  endDateInvalid = false;

  @Input() form: FormGroup;

  @Output() name: EventEmitter<string> = new EventEmitter();
  @Output() budget: EventEmitter<number> = new EventEmitter();
  @Output() bid: EventEmitter<number> = new EventEmitter();
  @Output() startdate: EventEmitter<number> = new EventEmitter();
  @Output() enddate: EventEmitter<number> = new EventEmitter();

  ngOnInit() { }

  changeName(value: string){
    this.name.emit(value)
  }

  changeBudget(value: string) {
    this.budget.emit(+value)
  }

  changeBid(value: string) {
    this.bid.emit(+value)
  }

  changeStartDate(event: MatDatepickerInputEvent<Date>) {
    try{
      this.startdate.emit(event.value['_d'])
      this.startDateInvalid = false;
    } catch(err) {
      this.form.controls['startDate'].setValue(null)
      this.startDateInvalid = true;
    }    
  }

  changeEndDate(event: MatDatepickerInputEvent<Date>) {
    try {
      this.enddate.emit(event.value['_d'])
      this.endDateInvalid = false;
    } catch (err) {
      this.form.controls['endDate'].setValue(null)
      this.endDateInvalid = true;
    }
  }
}
