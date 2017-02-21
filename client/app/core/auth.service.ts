import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

import { shared as config } from '../../../app-config';

@Injectable()
export class AuthService {

  private readonly lock = new Auth0Lock(
    config.auth0.clientId,
    config.auth0.domain, {
      container: 'login',
      language: 'pt-br',
      responseType: 'token'
    }
  );

  constructor() {
    this.lock.on("authenticated", (authResult) => {
      console.log('autenticamos!', authResult);
      localStorage.setItem('id_token', authResult.idToken);
    });
    this.lock.on("unrecoverable_error", this.showError);
    this.lock.on("authorization_error", this.showError);
  }

  private showError(error) {
    console.log('oops!', error);
    this.lock.show({
      flashMessage: {
        type: 'error',
        text: error.error_description
      }
    });
  }

  public login() {
    this.lock.show();
  }

  public authenticated() {
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    console.log('bye!');
    localStorage.removeItem('id_token');
  }

}
