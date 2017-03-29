import { Injectable } from '@angular/core';
import { Deserialize, DeserializeKeysFrom } from 'cerialize';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';

import { config } from '../../../app-config';
import User from '../../../server/user/user';

/**
 * Gerencia o login & logout no Auth0 e disponibiliza o usuário autenticado.
 */
@Injectable()
export class AuthService {

  private readonly userSource = new ReplaySubject<User>(1);
  private readonly logoutSource = new Subject<User>();
  private readonly storage: Storage;
  private readonly Auth0Lock: any;
  private readonly isAuthenticated: () => boolean;

  constructor(window: any, Auth0Lock: any, isAuthenticated: () => boolean) {
    this.Auth0Lock = Auth0Lock;
    this.isAuthenticated = isAuthenticated;
    this.storage = this.protectStorage(window);
  }

  /**
   * Emite o usuário caso ele já esteja autenticado (localStorage) ao carregar o app.
   */
  tryAutomaticLogin() {
    if (this.authenticated) {
      this.emitUser(
        this.createLock(),
        this.storage.getItem('accessToken') as any,
        this.storage.getItem('id_token') as any,
      );
    }
  }

  /**
   * Cria e exibe o componente do Auth0 para login e cadastro.
   */
  displayLoginForm(container?: string, redirect = true, remember = true): void {
    const lock = this.createLock(container, redirect, remember);
    lock.on("authenticated", res => this.onAuthenticated(lock, res));
    lock.on("unrecoverable_error", e => this.onError(lock, e));
    lock.on("authorization_error", e => this.onError(lock, e));
    lock.show();
  }

  /**
   * O usuário autenticado no sistema.
   */
  get user(): Observable<User> {
    return this.userSource.asObservable();
  }

  /**
   * Informa se o usuário está autenticado.
   */
  get authenticated(): boolean {
    // is there a non-expired 'id_token' in localStorage?
    return this.isAuthenticated();
  }

  /**
   * Mata a sessão do usuário atual.
   */
  logout(): void {
    this.storage.removeItem('accessToken');
    this.storage.removeItem('id_token');
    this.user.subscribe(
      user => this.logoutSource.next(user),
    );
  }

  onLogout(): Observable<User> {
    return this.logoutSource.asObservable();
  }

  /**
   * Cria uma instância do {@link Auth0Lock} com as opções informadas.
   * Referência: {@link https://auth0.com/docs/libraries/lock/v10/customization}
   */
  createLock(container?: string, redirect = true, rememberLastLogin = true): any {
    const auth = { responseType: 'token', redirect } as any;
    const options = { language: 'pt-br', auth, rememberLastLogin } as any;

    if (container) options.container = container;

    return new this.Auth0Lock(config.auth0.clientId, config.auth0.domain, options);
  }

  /**
   * Busca o perfil do usuário autenticado e notifica os assinantes de {@link AuthService#user}.
   */
  private emitUser(lock, accessToken: string, idToken: string): void {
    const getUserInfoRx: (id: string) => Observable<any>
      = Observable.bindNodeCallback(lock.getUserInfo.bind(lock));

    getUserInfoRx(accessToken).subscribe(
      profile => {
        DeserializeKeysFrom(User.keyTransformer);
        const user: User = Deserialize(profile, User);
        DeserializeKeysFrom(null as any);
        this.storage.setItem('id_token', idToken as any);
        this.storage.setItem('accessToken', accessToken as any);
        this.userSource.next(user);
      },
      (error: Error) => {
        this.logout();
        this.onError(lock, error);
      },
    );
  }

  /**
   * Mata a sessão se o usuário alterar os valores da localStorage (ex. via F12).
   */
  private protectStorage(window: Window) {
    Observable.fromEvent<StorageEvent>(window, 'storage')
      .filter(event => ['accessToken', 'id_token'].some(
        key => event.key === key && event.oldValue !== null,
      ))
      .subscribe(() => this.logout());
    return window.localStorage;
  }

  /**
   * Emite o usuário que acabou de se autenticar no lock.
   */
  private onAuthenticated(lock, authResult): void {
    lock.hide();
    this.emitUser(lock, authResult.accessToken, authResult.idToken);
  }

  /**
   * Exibe uma mensagem de erro no lock.
   */
  private onError(lock, error): void {
    lock.hide();
    lock.show({
      flashMessage: {
        type: 'error',
        text: error.error_description || error.message,
      },
    });
  }

}
