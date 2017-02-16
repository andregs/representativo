import { Database } from 'arangojs';

function createDatabase(config) {
  const username = config.arangodb.username;
  const password = config.arangodb.password;
  const url = `http://${username}:${password}@localhost:8529`;

  return new Database({ url, databaseName: 'repres' });
}

export default createDatabase;
