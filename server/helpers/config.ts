import * as express from 'express';
import { json } from 'body-parser';
import createDatabase from '../db';

const config = require('../../app-config');
const db = createDatabase(config);

beforeEach(function () {
  this.testDB = db;
  this.express = express();
  this.express.use(json());
});

afterAll(function (done) {
  db.truncate()
    .then(done)
    .catch(done.fail);
});
