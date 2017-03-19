import * as express from 'express';
import { static as _static } from 'express';
import { join } from 'path';
import { Server } from 'http';
import { json } from 'body-parser';
import signupEndpoint from './user/signup/signup.endpoint';
import { Database } from 'arangojs';
import jwtChecker from './user/jwt-checker.handler';
import questionEndpoint from './qa/question.endpoint';

/**
 * Classe que define o servidor web da nossa aplicação.
 */
export class RepresentativoApp {

  private express = express();
  private routes = [
    '/login',
    '/perfil',
  ];

  server: Server;

  constructor(db: Database) {
    this.express.use(json());
    this.express.use(_static(join(__dirname, '..', 'public')));

    this.routes.forEach(
      route => this.express.get(
        route,
        (_, res) => res.sendFile(join(__dirname, '..', 'public', 'index.html')),
      ),
    );

    jwtChecker(this.express);
    signupEndpoint(this.express, db);
    questionEndpoint(this.express, db);
  }

  listen() {
    // TODO change to a config key
    const port = 3000;
    this.server = this.express.listen(port, () => {
      const host = this.server.address().address;
      // tslint:disable-next-line:no-console
      console.log(`Servidor Express ouvindo em ${host}:${port}`);
    });
  }

  close() {
    this.server.close();
  }

}
