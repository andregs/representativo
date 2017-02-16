import createDatabase from '../db';
import { Database } from 'arangojs';

const config = require('../../app-config');

const db = createDatabase(config);

beforeEach(function () {
  this.db = db;
});

afterAll(function (done) {
  db.truncate()
    .then(done)
    .catch(done.fail);
});
