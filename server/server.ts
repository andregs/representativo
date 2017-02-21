import { RepresentativoApp } from './app';
import createDatabase from './db';

import { secret as config } from '../app-config';

const db = createDatabase(config.arangodb);
const app = new RepresentativoApp(db, config);

app.listen();
