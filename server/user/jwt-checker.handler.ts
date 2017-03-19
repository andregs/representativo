import { Express } from 'express';
import * as jwt from 'express-jwt';

import { config } from '../../app-config';

/**
 * Este middleware garante que a API seja acessível apenas por usuários autenticados.
 */
function jwtChecker(express: Express) {
  express.use(
    '/api/*',
    jwt({
      secret: process.env.AUTH0_SECRET,
      audience: config.auth0.clientId,
      issuer: `https://${config.auth0.domain}/`,
    }),
  );
}

export default jwtChecker;
