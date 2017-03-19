import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AutoWrapDirective } from './auto-wrap.directive';

/**
 * Este módulo fornece componentes compartilhados por vários outros módulos da aplicação.
 */
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    AutoWrapDirective,
  ],
  declarations: [AutoWrapDirective],
})
export class SharedModule { }
