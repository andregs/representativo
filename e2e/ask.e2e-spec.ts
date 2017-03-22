import { HomePO } from './po/home.po';
import Question from '../server/qa/question';

describe('Ask Component', function() {

  let home: HomePO;
  let question: Question;

  beforeAll(async function() {
    home = new HomePO();
    await home.navigateTo();
    question = new Question();
    question.title = 'Is this a proper title?';
    question.options[0] = 'aaa';
    question.options[1] = 'bbb';
  });

  it('should display the ask form', async function() {
    expect(await home.askComponent.getFormTitle().getText()).toMatch(/Faça uma nova pergunta/);
    expect(await home.askComponent.getOptionA().isPresent()).toBeFalsy('should not request the options yet');
    expect(await home.answerComponent.getTitle().isPresent()).toBeFalsy('should not display the answer form yet');
  });

  it('should request the options after typing the title', async function() {
    await home.askComponent.setTitle(question.title);
    expect(await home.askComponent.getOptionA().isDisplayed()).toBeTruthy('should request the options');
    expect(await home.answerComponent.getTitle().isPresent()).toBeFalsy('should not display the answer form yet');
  });

  it('should not accept submission of an invalid question', async function() {
    await home.askComponent.setOptions('aa', '');
    await home.askComponent.getSubmitButton().click();
    const classes = await Promise.all([
      home.askComponent.getOptionA().getAttribute('class'),
      home.askComponent.getOptionB().getAttribute('class'),
    ]);
    expect(classes[0].split(' ')).toContain('ng-invalid');
    expect(classes[1].split(' ')).toContain('ng-invalid');
    expect(await home.answerComponent.getTitle().isPresent()).toBeFalsy('should not display the answer form yet');
  });

  it('should request the answer after a valid question is submitted', async function() {
    await home.askComponent.getOptionA().clear();
    await home.askComponent.setOptions(question.options[0], question.options[1]);
    await home.askComponent.getSubmitButton().click();
    expect(await home.answerComponent.getTitle().getText()).toBe(question.title);
    expect(await home.answerComponent.getOptionLabel(0).getText()).toBe(question.options[0]);
    expect(await home.answerComponent.getOptionLabel(1).getText()).toBe(question.options[1]);
    expect(await home.answerComponent.isFormValid()).toBeFalsy('should not have an answer yet');
  });

  it('should not accept submission of an invalid answer', async function () {
    expect(await home.answerComponent.isFormValid()).toBeFalsy('should not have an answer yet');
    await home.answerComponent.getSubmitButton().click();
    expect(await home.answerComponent.isFormValid()).toBeFalsy('still no answer');
  });

  it('should save the new q & a', async function() {
    await home.answerComponent.getOptions().get(1).click();
    const expected = await home.answerComponent.getChosenAnswer().getText();
    const actual = await home.answerComponent.getOptionLabel(1).getText();
    expect(expected).toBe(actual);
    await home.answerComponent.getOpinion().sendKeys('my opinion');
    await home.answerComponent.getSubmitButton().click();
    expect(await home.askComponent.getFormTitle().getText()).toMatch(/Faça uma nova pergunta/);
  });

});
