import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './core/auth-guard.service';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: HomeComponent,
}, {
  path: 'login',
  component: LoginComponent,
}, {
  path: 'perfil',
  canActivate: [AuthGuard],
  component: ProfileComponent,
}];

/**
 * Este módulo define as rotas (URLs) da aplicação.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
