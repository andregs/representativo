import { RepresentativoApp } from './app';
import { createDatabase } from './db';

const username = process.env.DB_USERNAME || 'repres';
const password = process.env.DB_PASSWORD || 'repres';
const db = createDatabase(username, password);
const app = new RepresentativoApp(db);

app.listen();
