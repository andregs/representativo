import { Database } from 'arangojs';

function createDatabase(username: string, password: string) {
  const url = `http://${username}:${password}@localhost:8529`;

  return new Database({ url, databaseName: 'repres' });
}

export default createDatabase;
