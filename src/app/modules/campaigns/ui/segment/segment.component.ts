import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';


@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html'
})
export class SegmentComponent implements OnInit {

  errorDevicesRequired ='Devices is required';
  selectable = true;
  removable = true;
  deviceCtrl = new FormControl();
  selectedevices: string[] = [];
  
  @Input() alldevices: string[];
  @Input() form: FormGroup;

  @Output() onDevices: EventEmitter<string[]> = new EventEmitter();

  @ViewChild('deviceInput', { static: false }) deviceInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger, { static: false }) trigger: MatAutocompleteTrigger;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor() { }

  ngOnInit() {
    let devArray = this.form.controls['devices'].value
    this.selectedevices = devArray;
    this.alldevices = this.alldevices.filter(i => devArray.indexOf(i) < 0)
  }

  remove(device: string): void {
    const index = this.selectedevices.indexOf(device);

    if (index >= 0) {
      this.selectedevices.splice(index, 1);
      this.form.controls['devices'].setValue(this.selectedevices)
      this.alldevices.push(device)
      this.onDevices.emit(this.selectedevices)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedevices.push(event.option.viewValue);
    this.deviceInput.nativeElement.value = '';
    this.alldevices = this.alldevices.filter(v => v !== event.option.viewValue)
    this.deviceInput.nativeElement.blur()
    this.onDevices.emit(this.selectedevices)
  }

  focus(){
    this.trigger.openPanel()
  }
}
