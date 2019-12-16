import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  form: FormGroup;

  @Input() title: string;
  @Input() loading: boolean;
  @Output() onSubmit: EventEmitter<FormGroup> = new EventEmitter();

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submitHandler(){
    this.onSubmit.emit(this.form.value);
  }

}
