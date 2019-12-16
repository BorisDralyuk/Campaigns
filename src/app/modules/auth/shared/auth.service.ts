import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false;

  constructor(private afAuth: AngularFireAuth) { }

  public login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public setAuthenticated(status: boolean){
    this.isAuth = status;
  }

  public isAuthenticated() {
    return this.isAuth;
  }
}
