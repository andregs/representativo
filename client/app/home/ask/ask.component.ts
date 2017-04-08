import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Question } from '../../../../server/qa/question';
import { Answer } from '../../../../server/qa/answer';
import { QuestionService } from '../question.service';

/**
 * Este componente permite ao usuário criar uma nova pergunta.
 * A nova pergunta só é enviada para o backend após o usuário
 * fornecer também a sua resposta para ela.
 */
@Component({
  selector: 're-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss'],
})
export class AskComponent {

  @ViewChild('qForm') qForm: NgForm;
  @ViewChild('aForm') aForm: NgForm;
  private service: QuestionService;

  question: Question;
  answer: Answer;
  step: 'asking' | 'answering';

  constructor(service: QuestionService) {
    this.service = service;
    this.reset();
  }

  /**
   * Retorna o modelo ao seu estado inicial.
   */
  private reset() {
    this.question = new Question();
    this.answer = new Answer();
    this.step = 'asking';
  }

  /**
   * Ao enviar o form de pergunta, avança para o form de resposta.
   */
  onAsk() {
    if (this.qForm.valid) {
      this.step = 'answering';
    }
  }

  /**
   * Ao enviar o form de resposta, submete pergunta & resposta ao backend.
   */
  onAnswer() {
    if (this.aForm.valid) {
      this.service.ask(this.question, this.answer).subscribe(() => this.reset());
    }
  }

}
