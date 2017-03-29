import * as express from 'express';
import { json } from 'body-parser';
import createDatabase from '../db';
import jwtChecker from '../user/jwt-checker.handler';
import * as jwt from 'jsonwebtoken';

import { config } from '../../app-config';
const username = process.env.DB_USERNAME || 'repres';
const password = process.env.DB_PASSWORD || 'repres';
const db = createDatabase(username, password);

beforeAll(function (done) {
  this.testDB = db;
  const options = {
    subject: process.env.TEST_USER_ID,
    expiresIn: 5,
    audience: config.auth0.clientId,
    issuer: `https://${config.auth0.domain}/`,
  };
  this.bearerToken = `Bearer ${jwt.sign(
    { username: process.env.TEST_USERNAME },
    process.env.AUTH0_SECRET,
    options,
  )}`;
  db.truncate()
    .then(done)
    .catch(done.fail);
});

beforeEach(function () {
  this.express = express();
  this.express.use(json());
  jwtChecker(this.express);
  this.express.use(function (err, _, res, next) {
    if (err && err.status) {
      res.status(err.status);
      res.json(err.inner);
    } else {
      next(err);
    }
  });
});
