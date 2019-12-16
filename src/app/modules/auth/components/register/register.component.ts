import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { User } from '../../shared/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private message: MessageService) { }

  onSubmit(user: User) {
    this.loading = true;
    this.auth.register(user)
    .then(() => {
      this.loading = false;
      this.auth.setAuthenticated(true);
      this.message.openSnackBar('Registration Ok', '', true)
      this.router.navigate(['/login'])
    })
    .catch(err => {
      this.loading = false;
      this.auth.setAuthenticated(false);
      this.message.openSnackBar(err.message, '', false)
    })
  }
}

