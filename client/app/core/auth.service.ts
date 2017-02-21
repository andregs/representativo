import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import { Deserialize, DeserializeKeysFrom } from 'cerialize';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { bindNodeCallback } from 'rxjs/Observable/bindNodeCallback';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { shared as config } from '../../../app-config';
import User from '../../../server/user/user';

@Injectable()
export class AuthService {

  private readonly userSource = new ReplaySubject<User>(1);

  constructor() {
    // this emits a user if he/she is already signed in
    this.emitAuthenticatedUser(this.createLock());
  }

  displayLoginForm(redirectUrl?: string): void {
    const lock = this.createLock(redirectUrl);
    lock.on("authenticated", res => this.onAuthenticated(lock, res));
    lock.on("unrecoverable_error", e => this.onError(lock, e));
    lock.on("authorization_error", e => this.onError(lock, e));
    lock.show();
  }

  get user(): Observable<User> {
    return this.userSource.asObservable();
  }

  get authenticated(): boolean {
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  logout(): void {
    console.log('bye!');
    localStorage.removeItem('id_token');
    localStorage.removeItem('accessToken');
  }

  private createLock(redirectUrl?: string): any {
    const auth: any = { responseType: 'token' };
    if (redirectUrl) {
      auth.redirectUrl = redirectUrl;
    };

    return new Auth0Lock(
      config.auth0.clientId,
      config.auth0.domain, {
        container: 'login',
        language: 'pt-br',
        auth
      });
  }

  private emitAuthenticatedUser(lock): void {
    const accessToken = localStorage.getItem('accessToken');
    if (this.authenticated && accessToken) {
      const getUserInfoRx: (id: string) => Observable<any>
        = bindNodeCallback(lock.getUserInfo.bind(lock));
      getUserInfoRx(accessToken).subscribe(
        profile => {
          console.log('got auth0 profile', profile);
          DeserializeKeysFrom(User.keyTransformer);
          const user: User = Deserialize(profile, User);
          console.log('got auth0 User', user);
          DeserializeKeysFrom(null);
          this.userSource.next(user);
          this.userSource.complete(); // FIXME should not complete
        },
        error => {
          localStorage.removeItem('id_token'); // logout
          localStorage.removeItem('accessToken');
          this.userSource.error(error); // I think this finishes the stream
        }
      );
    }
  }

  private onAuthenticated(lock, authResult): void {
    console.log('autenticamos!', authResult);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('accessToken', authResult.accessToken);
    this.emitAuthenticatedUser(lock);
  }

  private onError(lock, error): void {
    console.log('oops!', error);
    lock.show({
      flashMessage: {
        type: 'error',
        text: error.error_description
      }
    });
  }

}
