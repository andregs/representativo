'use strict';

const config = require('../app-config');
const arangojs = require('arangojs');

const { rootpasswd, username, password } = config.arangodb;

const host = 'localhost';
const port = '8529';
const db = arangojs({
  url: `http://root:${rootpasswd}@${host}:${port}`
});

db.dropDatabase('repres')
  .then(() => console.log('representativo\'s db no longer exists'));
