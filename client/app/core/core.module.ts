import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

import authHttpFactory from '../../helper/auth-http-factory';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';

let win = {}; // o jasmine (node) não conhece window
if ('undefined' === typeof window) win = window;

/**
 * Este módulo provê os serviços (singletons) a nível de aplicação.
 * Ele também declara alguns componentes usados no componente raiz {@link AppComponent}.
 */
@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    HttpModule,
  ],
  declarations: [LoginComponent, ToolbarComponent],
  exports: [ToolbarComponent],
  providers: [
    { provide: 'window', useValue: win },
    { provide: 'Auth0Lock', useValue: Auth0Lock },
    { provide: 'isAuthenticated', useValue: tokenNotExpired },
    {
      provide: AuthService,
      useClass: AuthService,
      deps: [
        'window',
        'Auth0Lock',
        'isAuthenticated',
      ],
    },
    { provide: AuthHttp, useFactory: authHttpFactory, deps: [Http, RequestOptions] },
  ],
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }

}
