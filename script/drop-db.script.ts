'use strict';

/**
 * Este script exclui o banco de dados no ArangoDB.
 */

import { Database } from 'arangojs';

const host = process.env.ARANGO_HOST || '127.0.0.1';
const port = process.env.ARANGO_PORT || '8529';
const rootpasswd = process.env.ARANGO_ROOTPASSWD || '';
const db = new Database({
  url: `http://root:${rootpasswd}@${host}:${port}`
});

db.dropDatabase('repres')
  .then(() => console.log('representativo\'s db no longer exists'));
