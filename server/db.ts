import { Database } from 'arangojs';

export function createDatabase(username: string, password: string) {
  const url = `http://${username}:${password}@127.0.0.1:8529`;

  return new Database({ url, databaseName: 'repres' });
}
