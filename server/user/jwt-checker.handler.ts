import { Express } from 'express';
import * as jwt from 'express-jwt';

import * as config from '../../app-config';

/**
 * Este middleware garante que a API seja acessível apenas por usuários autenticados.
 */
function jwtChecker(express: Express) {
  express.use(
    '/api/*',
    jwt({
      secret: new Buffer(config.secret.auth0.secret, 'base64'),
      audience: config.shared.auth0.clientId,
      issuer: `https://${config.shared.auth0.domain}`
    })
  );
}

export default jwtChecker;
