import Question from './question';
import Answer from './answer';
import ask from './ask.model';

describe('Ask Model', function () {

  beforeEach(function () {
    const question = new Question();
    question.title = 'New question';
    question.options[0] = 'Opt A';
    question.options[1] = 'Opt B';

    const answer = new Answer();
    answer.chosen = 1;
    answer.opinion = 'My opinion';

    this.question = question;
    this.answer = answer;
  });

  it('should save a new question on DB', async function (done) {
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
