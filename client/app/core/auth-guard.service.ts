import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

/**
 * Este guard só deixa usuários autenticados acessarem a rota.
 * Redireciona usuários não autenticados para a página de login.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  private readonly auth: AuthService;
  private readonly router: Router;

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;
  }

  canActivate(): Promise<boolean> {
    if (!this.auth.authenticated) {
      this.router.navigate(['/', 'login']);
    }
    return Promise.resolve(this.auth.authenticated);
  }

}
