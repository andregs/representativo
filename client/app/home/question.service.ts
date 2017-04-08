import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Serialize } from 'cerialize';
import { Observable } from 'rxjs/Observable';

import { Question } from '../../../server/qa/question';
import { Answer } from '../../../server/qa/answer';

/**
 * Este serviço permite a criação de novas perguntas.
 */
@Injectable()
export class QuestionService {

  readonly endpoint = 'api/question';
  readonly http: AuthHttp;

  constructor(http: AuthHttp) {
    this.http = http;
  }

  /**
   * Cria uma nova pergunta no BD. O usuário não pode criar uma pergunta sem
   * deixar a sua resposta para ela.
   * @param question pergunta a ser criada.
   * @param answer resposta da pergunta.
   * @returns url da pergunta criada.
   */
  ask(question: Question, answer: Answer): Observable<string> {
    const body = { question, answer };
    return this.http
      .post(this.endpoint, Serialize(body))
      .map(res => res.headers.get('Location'));
  }

}
