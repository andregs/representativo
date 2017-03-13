import { NgModule } from '@angular/core';
import { AskComponent } from './ask/ask.component';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [HomeComponent, AskComponent],
  exports: [HomeComponent, AskComponent],
})
export class HomeModule { }
