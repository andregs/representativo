import { $ } from 'protractor';

export class AskPO {

  getFormTitle() {
    return $('#qForm md-card-subtitle');
  }

  getTitle() {
    return $('#qForm textarea[name=title]');
  }

  setTitle(title: string) {
    return this.getTitle().sendKeys(title);
  }

  getOptionA() {
    return $('#qForm textarea[name=optionA]');
  }

  getOptionB() {
    return $('#qForm textarea[name=optionB]');
  }

  setOptions(optionA: string, optionB: string) {
    return Promise.all([
      this.getOptionA().sendKeys(optionA),
      this.getOptionB().sendKeys(optionB),
    ]);
  }

  getSubmitButton() {
    return $('#qForm button[type=submit]');
  }

}
