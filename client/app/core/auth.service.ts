import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import { Deserialize, DeserializeKeysFrom } from 'cerialize';
import { Observable } from 'rxjs/Observable';
import { bindNodeCallback } from 'rxjs/Observable/bindNodeCallback';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { shared as config } from '../../../app-config';
import User from '../../../server/user/user';

@Injectable()
export class AuthService {

  private readonly userSource = new ReplaySubject<User>(1);

  constructor() {
    if (this.authenticated) {
      this.emitAuthenticatedUser(
        this.createLock(),
        localStorage.getItem('accessToken')
      );
    }
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
    return tokenNotExpired(); // is there 'id_token' in localStorage?
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

  private emitAuthenticatedUser(lock, accessToken?: string, idToken?: string): void {
    const getUserInfoRx: (id: string) => Observable<any>
      = bindNodeCallback(lock.getUserInfo.bind(lock));

    getUserInfoRx(accessToken)
    // .do(() => { throw new Error('boom!'); })
    .subscribe(
      profile => {
        console.log('got auth0 profile', profile);
        DeserializeKeysFrom(User.keyTransformer);
        const user: User = Deserialize(profile, User);
        console.log('got auth0 User', user);
        DeserializeKeysFrom(null);
        this.userSource.next(user);
        lock.hide();
        localStorage.setItem('id_token', idToken);
        localStorage.setItem('accessToken', accessToken);
      },
      (error: Error) => {
        this.logout();
        this.onError(lock, error);
      }
    );
  }

  private onAuthenticated(lock, authResult): void {
    console.log('autenticamos!', authResult);
    this.emitAuthenticatedUser(lock, authResult.accessToken, authResult.idToken);
  }

  private onError(lock, error): void {
    console.log('oops!', error);
    lock.hide();
    lock.show({
      flashMessage: {
        type: 'error',
        text: error.error_description || error.message
      }
    });
  }

}
