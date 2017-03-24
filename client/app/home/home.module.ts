import { NgModule } from '@angular/core';
import { AskComponent } from './ask/ask.component';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionService } from './question.service';

/**
 * Este módulo declara os componentes usados na página inicial da aplicação.
 */
@NgModule({
  imports: [SharedModule],
  declarations: [HomeComponent, AskComponent],
  providers: [QuestionService],
})
export class HomeModule { }
