import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';

/**
 * Recurso de gerenciamento de usuários e perfis.
 */
@NgModule({
  imports: [SharedModule],
  declarations: [ProfileComponent],
})
export class UserModule { }
