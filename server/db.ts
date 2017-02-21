import { Database } from 'arangojs';

function createDatabase(config: { username: string, password: string }) {
  const { username, password } = config;
  const url = `http://${username}:${password}@localhost:8529`;

  return new Database({ url, databaseName: 'repres' });
}

export default createDatabase;
