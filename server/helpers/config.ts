import * as express from 'express';
import { json } from 'body-parser';
import createDatabase from '../db';
import jwtChecker from '../user/jwt-checker.handler';
import * as jwt from 'jsonwebtoken';

import { config } from '../../app-config';
const username = process.env.DB_USERNAME || 'repres';
const password = process.env.DB_PASSWORD || 'repres';
const db = createDatabase(username, password);

beforeAll(function () {
  this.testDB = db;
  const options = {
    subject: process.env.TEST_USER_ID,
    expiresIn: 5,
    audience: config.auth0.clientId,
    issuer: `https://${config.auth0.domain}`,
  };
  this.bearerToken = `Bearer ${jwt.sign(
    { username: process.env.TEST_USERNAME },
    new Buffer(process.env.AUTH0_SECRET, 'base64'),
    options,
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
