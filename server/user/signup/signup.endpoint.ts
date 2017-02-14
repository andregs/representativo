import { Express, Request, Response } from 'express';
import { Database } from 'arangojs';
import signup from './signup.model';
import { sendError } from '../../shared/functions';

/**
 * Creates a user.
 *
 * Example:
 * POST /api/user/signup
 * { "_key": "andre", "name": "André Gomes" ... }
 */
function signupEndpoint(express: Express, db: Database) {

  express.route('/api/user/signup')
    .post((req: Request, res: Response) => {
      signup(req.body, db)
        .then(results => {
          console.log('got results', results);
          return results ? res.json(results) : res.sendStatus(500);
        })
        .catch(err => sendError(err, res));
    });

}

export default signupEndpoint;
