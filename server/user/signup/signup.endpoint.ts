import { Express, Request, Response } from 'express';
import { Database } from 'arangojs';
import signup from './signup.model';
import { sendError } from '../../shared/functions';

/**
 * Cadastra um novo usuário no app.
 * Este endpoint foi projetado para ser invocado pelo Auht0, através de
 * [uma rule](https://github.com/andregs/representativo/blob/master/rules/),
 * sempre que um novo usuário se registra no app.
 *
 * Exemplo:
 * POST /api/user/signup
 * { "_key": "andre", "name": "André Gomes" ... }
 */
function signupEndpoint(express: Express, db: Database) {

  express.route('/api/user/signup')
    .post((req: Request, res: Response) => {
      signup(req.body, db)
        .then(results => {
          return results ? res.json(results) : res.sendStatus(500);
        })
        .catch(err => sendError(err, res));
    });

}

export default signupEndpoint;
