import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import 'hammerjs';

import authHttpFactory from '../../helper/auth-http-factory';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

/**
 * Este módulo provê os serviços (singletons) a nível de aplicação.
 * Ele também declara alguns componentes usados no componente raiz {@link AppComponent}.
 */
@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  declarations: [LoginComponent, ToolbarComponent],
  exports: [LoginComponent, ToolbarComponent],
  providers: [
    AuthService,
    { provide: AuthHttp, useFactory: authHttpFactory, deps: [Http, RequestOptions] },
  ],
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }

}
