import * as request from 'supertest';
import * as signup from './signup.model';
import signupEndpoint from './signup.endpoint';
import { Database } from 'arangojs';
import { Serialize } from 'cerialize';
import User from '../user';

describe('Signup Endpoint', function () {

  beforeEach(function () {
    signupEndpoint(this.express, new Database());
    this.base = '/api/user';
    this.user = {
      _key: 'asdf',
      email: 'asdf@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.signupModel = spyOn(signup, 'default').and.callFake(
      () => Promise.resolve(this.user)
    );
  });

  it('should respond with 401 when user is not signed in', function (done) {
    request(this.express)
      .post(`${this.base}/signup`)
      .expect(401)
      .then(done)
      .catch(done.fail);
  });

  it('should respond with 201 + Location when the user is created', function (done) {
    request(this.express)
      .post(`${this.base}/signup`)
      .set('Authorization', this.bearerToken)
      .send(Serialize(this.user, User))
      .expect(201)
      .expect('Location', `${this.base}/${this.user._key}`)
      .expect('Content-Type', /text/)
      .then(done)
      .catch(done.fail);
  });

  it('should respond with 200 when the user is updated', function (done) {
    this.user.updatedAt.setMinutes(this.user.updatedAt.getMinutes() + 1);
    request(this.express)
      .post(`${this.base}/signup`)
      .set('Authorization', this.bearerToken)
      .send(Serialize(this.user, User))
      .expect(200)
      .expect('Content-Type', /text/)
      .then(done)
      .catch(done.fail);
  });

  it('should respond with 500 + error when things go wrong', function (done) {
    (this.signupModel as jasmine.Spy).and.throwError('boom!');
    request(this.express)
      .post(`${this.base}/signup`)
      .set('Authorization', this.bearerToken)
      .send(Serialize(this.user, User))
      .expect(500)
      .expect('Content-Type', /json/)
      .expect({ name: 'Error', message: 'boom!' })
      .then(done)
      .catch(done.fail);
  });

});
