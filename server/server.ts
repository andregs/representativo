import { RepresentativoApp } from './app';
import createDatabase from './db';

const config = require('../app-config');

const db = createDatabase(config);
const app = new RepresentativoApp(db, config);

app.listen();
