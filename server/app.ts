import * as express from 'express';
import { Request, Response, static as _static } from 'express';
import { join } from 'path';
import { Server } from 'http';
import { json } from 'body-parser';

export class RepresentativoServer {

  private express = express();
  private routes = [];

  server: Server;

  constructor() {
    this.express.use(json());

    this.express.use(_static(join(__dirname, '..', 'dist', 'public')));

    this.routes.forEach(
      route => this.express.get(
        route,
        (req, res) => res.sendFile(__dirname + '/public/index.html')
      )
    );
  }

  listen() {
    // TODO change to a config key
    const port = 3000;
    this.server = this.express.listen(port, () => {
      const host = this.server.address().address;
      console.log(`Servidor Express ouvindo em ${host}:${port}`);
    });
  }

  close() {
    this.server.close();
  }

}
