import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { Campaign } from '../../shared/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html'
})
export class StepperComponent implements OnInit {

  step_1 = 'Targeting';
  step_2 = 'Segment';
  step_3 = 'Summery';
  next = 'Next';
  back = 'Back';
  submit = 'Submit';
  formTarget: FormGroup;
  formSegment: FormGroup;
  isLinear  = true;

  @Input() campaign: Campaign;
  @Input() alldevices: string[];
  @Output() onSubmit: EventEmitter<Campaign> = new EventEmitter()

  @Output() onName: EventEmitter<string> = new EventEmitter()
  @Output() onBudget: EventEmitter<number> = new EventEmitter()
  @Output() onBid: EventEmitter<number> = new EventEmitter()
  @Output() onStartDate: EventEmitter<number> = new EventEmitter()
  @Output() onEndDate: EventEmitter<number> = new EventEmitter()
  @Output() onDevices: EventEmitter<string[]> = new EventEmitter()
  

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formTarget = this._formBuilder.group({
      name: [this.campaign.name, Validators.required],
      budget: [this.campaign.budget, [Validators.required, this.budgetValidator(this.campaign.bid)]],
      bid: [this.campaign.bid, Validators.required],
      startDate: [this.campaign.startDate ? moment(this.campaign.startDate).format('YYYY-MM-DD') : null, Validators.required],
      endDate: [this.campaign.endDate ? moment(this.campaign.endDate).format('YYYY-MM-DD') : null, Validators.required],
    });

    this.formSegment = this._formBuilder.group({
      devices: [this.campaign.devices, this.deviceValidator],
    })
  }
 
  deviceValidator(control: FormControl): { [key: string]: any } | null {
    return control.value.length===0 ?  { 'devicesEmpty': { value: control.value } } : null;
  }

  budgetValidator(bid: number): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value < (bid*10)  ? { 'maxBudget': { value: control.value } } : null;
    }
  }
  
  handlerSubmit() {
    this.onSubmit.emit(this.campaign)
  }

  setName(value: string) {
    this.onName.emit(value)
  }

  setBudget(value: number) {
    this.onBudget.emit(value)
  }

  setBid(value: number) {
    this.onBid.emit(value)
  }

  setStartDate(value: number) {
    this.onStartDate.emit(new Date(value).valueOf()) 
  }

  setEndDate(value: number) {
    this.onEndDate.emit(new Date(value).valueOf())
  }
  
  setDevices(value: string[]) {
    this.onDevices.emit(value)
  }
}
