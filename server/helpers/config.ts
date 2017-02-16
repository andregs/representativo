import createDatabase from '../db';
import { Database } from 'arangojs';

const config = require('../../app-config');

console.log('helpers ready');
const db = createDatabase(config);

beforeEach(function () {
  console.log('before each - helper');
  this.db = db;
});

afterAll(function (done) {
  console.log('after all - helper');
  db.truncate()
    .then(done)
    .catch(done.fail);
});
