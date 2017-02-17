import * as express from 'express';
import * as request from 'supertest';
import * as signup from './signup.model';
import signupEndpoint from './signup.endpoint';
import { Database } from 'arangojs';
import { json } from 'body-parser';

describe('Signup Endpoint', function () {

  const app = express();
  app.use(json());
  signupEndpoint(app, new Database());

  it('should fail', function (done) {
    spyOn(signup, 'default').and.callFake(() => Promise.reject({ asdf: 'yes' }));

    request(app)
      .post('/api/user/signup')
      .send({ asdf: 'lol' })
      .set('Accept', 'application/json')
      .expect(500)
      .then(done)
      .catch(done.fail);
  });

});
