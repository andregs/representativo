import { $, $$ } from 'protractor';

export class AnswerPO {

  getTitle() {
    return $('#aForm md-card-title');
  }

  async isFormValid() {
    const classes = await $('#aForm').getAttribute('class');
    return classes.split(' ').indexOf('ng-valid') >= 0;
  }

  getOptions() {
    return $$('#aForm md-radio-button label');
  }

  getChosenAnswer() {
    return $('#aForm md-radio-group input:checked + div');
  }

  getOptionLabel(option: 0 | 1) {
    return $$('#aForm md-radio-group input + div').get(option);
  }

  getOpinion() {
    return $('#aForm textarea[name=opinion]');
  }

  getSubmitButton() {
    return $('#aForm button[type=submit]');
  }

}
