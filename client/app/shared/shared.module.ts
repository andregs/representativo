import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutoWrapDirective } from './auto-wrap.directive';

/**
 * Este módulo fornece componentes compartilhados por vários outros módulos da aplicação.
 */
@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    AutoWrapDirective,
  ],
  declarations: [AutoWrapDirective],
})
export class SharedModule { }
