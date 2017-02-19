import * as express from 'express';
import { json } from 'body-parser';
import createDatabase from '../db';
import jwtChecker from '../user/jwt-checker.handler';
import * as jwt from 'jsonwebtoken';

const config = require('../../app-config');
const db = createDatabase(config);

beforeAll(function () {
  this.testDB = db;
  const options = {
    subject: config.auth0.testUser.id,
    expiresIn: 5,
    audience: config.auth0.clientId,
    issuer: config.auth0.domain
  };
  this.bearerToken = `Bearer ${jwt.sign(
    { username: config.auth0.testUser.username },
    new Buffer(config.auth0.secret, 'base64'),
    options
  )}`;
});

beforeEach(function () {
  this.express = express();
  this.express.use(json());
  jwtChecker(this.express);
});

afterAll(function (done) {
  db.truncate()
    .then(done)
    .catch(done.fail);
});
