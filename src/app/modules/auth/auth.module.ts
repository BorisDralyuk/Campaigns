import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FirebaseModule } from '../../shared/modules/firebase/firebase.module';

import { AuthPageComponent } from './layout/auth-page/auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './ui/auth/auth.component';

import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [
    AuthPageComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    FirebaseModule
  ],
  providers: [AuthService],
  bootstrap: []
})
export class AuthModule { }
