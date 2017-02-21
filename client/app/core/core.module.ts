import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [LoginComponent, ToolbarComponent],
  exports: [LoginComponent, ToolbarComponent],
  providers: [AuthService]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }

}
