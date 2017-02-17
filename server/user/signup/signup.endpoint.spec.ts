import * as request from 'supertest';
import * as signup from './signup.model';
import signupEndpoint from './signup.endpoint';
import { Database } from 'arangojs';

describe('Signup Endpoint', function () {

  signupEndpoint(this.express, new Database());

  it('should fail', function (done) {
    spyOn(signup, 'default').and.callFake(
      () => Promise.reject({ asdf: 'yes' })
    );

    request(this.express)
      .post('/api/user/signup')
      .send({ asdf: 'lol' })
      .set('Accept', 'application/json')
      .expect(500)
      .then(done)
      .catch(done.fail);
  });

});
