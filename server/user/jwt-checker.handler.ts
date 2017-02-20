import { Express } from 'express';
import * as jwt from 'express-jwt';

const config = require('../../app-config');

/**
 * Este middleware garante que a API seja acessível apenas por usuários autenticados.
 */
function jwtChecker(express: Express) {
  express.use(
    '/api/*',
    jwt({
      secret: new Buffer(config.auth0.secret, 'base64'),
      audience: config.auth0.clientId,
      issuer: `https://${config.auth0.domain}`
    })
  );
}

export default jwtChecker;
