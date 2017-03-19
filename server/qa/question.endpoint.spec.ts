import questionEndpoint from './question.endpoint';
import { Database } from 'arangojs';
import * as ask from './ask.model';
import * as request from 'supertest';
import ModelError from '../shared/model-error';

describe('Question Endpoint', function () {

  beforeEach(function () {
    questionEndpoint(this.express, new Database());
    this.url = '/api/question';
    this.question = {
      _key: '314198',
      _rev: '9867234',
      title: 'New Question?',
      options: ['opt a', 'opt b'],
    };
    this.askModel = spyOn(ask, 'default').and.callFake(
      () => Promise.resolve(this.question),
    );
  });

  it('should respond with 201 + Location when the question is created', function (done) {
    request(this.express)
      .post(`${this.url}`)
      .set('Authorization', this.bearerToken)
      .send(this.question)
      .expect(201)
      .expect('Location', `${this.url}/${this.question._key}`)
      .expect('Content-Type', /text/)
      .then(done)
      .catch(done.fail);
  });

  it('should respond with the proper code when an expected error happens', function (done) {
    const error = new ModelError();
    (this.askModel as jasmine.Spy).and.callFake(() => { throw error; });
    request(this.express)
      .post(`${this.url}`)
      .set('Authorization', this.bearerToken)
      .send(this.question)
      .expect(error.statusCode)
      .expect('Content-Type', /json/)
      .expect({ name: error.name, message: error.message })
      .then(done)
      .catch(done.fail);
  });

  it('should respond with 500 + error when things go wrong', function (done) {
    (this.askModel as jasmine.Spy).and.throwError('boom!');
    request(this.express)
      .post(`${this.url}`)
      .set('Authorization', this.bearerToken)
      .send(this.question)
      .expect(500)
      .expect('Content-Type', /json/)
      .expect({ name: 'Error', message: 'boom!' })
      .then(done)
      .catch(done.fail);
  });

});
