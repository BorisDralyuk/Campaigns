import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './layout/auth-page/auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {
    path: '', component: AuthPageComponent
    , children:
      [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
