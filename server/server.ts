import { Database } from 'arangojs';
import { RepresentativoServer } from './app';

const config = require('../app-config');
const username = config.arangodb.username;
const password = config.arangodb.password;
const url = `http://${username}:${password}@localhost:8529`;
const db = new Database({ url, databaseName: 'repres' });

const server = new RepresentativoServer(db, config);
server.listen();
