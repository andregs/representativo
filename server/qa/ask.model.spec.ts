import { repeat } from 'lodash';

import { Question } from './question';
import { Answer } from './answer';
import ask from './ask.model';
import { ModelError } from '../shared/model-error';

describe('Ask Model', function () {

  beforeEach(function () {
    const question = new Question();
    question.title = repeat('a', 140);
    question.options[0] = 'Opt';
    question.options[1] = repeat('a', 140);

    const answer = new Answer();
    answer.chosen = 1;
    answer.opinion = repeat('a', 400);

    this.question = question;
    this.answer = answer;
  });

  it('should not save a question with a too short title', async function (done) {
    try {
      this.question.title = 'short';
      await ask(this.question, this.answer, process.env.TEST_USER_ID, this.testDB);
    } catch (err) {
      expect(err instanceof ModelError).toBe(true);
      done();
    }
  });

  it('should not save a question with a too big title', async function (done) {
    try {
      this.question.title = repeat('a', 141);
      await ask(this.question, this.answer, process.env.TEST_USER_ID, this.testDB);
    } catch (err) {
      expect(err instanceof ModelError).toBe(true);
      done();
    }
  });

  it('should not save a question with a too short option', async function (done) {
    try {
      this.question.options[0] = 'no';
      await ask(this.question, this.answer, process.env.TEST_USER_ID, this.testDB);
    } catch (err) {
      expect(err instanceof ModelError).toBe(true);
      done();
    }
  });

  it('should not save a question with a too big option', async function (done) {
    try {
      this.question.options[1] = repeat('a', 141);
      await ask(this.question, this.answer, process.env.TEST_USER_ID, this.testDB);
    } catch (err) {
      expect(err instanceof ModelError).toBe(true);
      done();
    }
  });

  it('should not save a question without an answer', async function (done) {
    try {
      this.answer.chosen = undefined;
      await ask(this.question, this.answer, process.env.TEST_USER_ID, this.testDB);
    } catch (err) {
      expect(err instanceof ModelError).toBe(true);
      done();
    }
  });

  it('should not save a question with a too big opinion', async function (done) {
    try {
      this.answer.opinion = repeat('a', 401);
      await ask(this.question, this.answer, process.env.TEST_USER_ID, this.testDB);
    } catch (err) {
      expect(err instanceof ModelError).toBe(true);
      done();
    }
  });

  it('should save a valid new question on DB', async function (done) {
    try {
      const created = await ask(this.question, this.answer, process.env.TEST_USER_ID, this.testDB);
      expect(created._key).toBeTruthy();
      expect(created._rev).toBeTruthy();
      done();
    } catch (err) {
      done.fail(err);
    }
  });

});
