'use strict';

/**
 * Este script exclui o banco de dados no ArangoDB.
 */

import { secret as config } from '../app-config';
import { Database } from 'arangojs';

const { rootpasswd } = config.arangodb;

const host = 'localhost';
const port = '8529';
const db = new Database({
  url: `http://root:${rootpasswd}@${host}:${port}`
});

db.dropDatabase('repres')
  .then(() => console.log('representativo\'s db no longer exists'));
