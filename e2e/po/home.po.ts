import { browser } from 'protractor';
import { AskPO } from './ask.po';
import { AnswerPO } from './answer.po';

export class HomePO {

  readonly askComponent = new AskPO();
  readonly answerComponent = new AnswerPO();

  navigateTo() {
    return browser.get(`/`);
  }

}
