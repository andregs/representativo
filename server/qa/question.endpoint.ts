import { Express, Request, Response } from 'express';
import { Database } from 'arangojs';
import ask from './ask.model';
import { sendError } from '../shared/functions';
import { Question } from './question';
import { Answer } from './answer';
import { GenericDeserialize as Deserialize } from 'cerialize';

/**
 * Cria uma nova pergunta no app.
 *
 * Exemplo:
 * ```
 * POST /api/question
 * {
 *   "question": {
 *     "title": string,
 *     "options": [string, string]
 *   },
 *   "answer": {
 *     "chosen": 0 | 1,
 *     "opinion": string
 *   }
 * }
 * ```
 */
export function questionEndpoint(express: Express, db: Database) {

  const base = '/api/question';

  express.route(base)
    .post(async (req: Request, res: Response) => {
      try {
        const question = Deserialize(req.body.question, Question);
        const answer = Deserialize(req.body.answer, Answer);
        const newQuestion = await ask(question, answer, req.user.sub, db);
        res.set('Location', `${base}/${newQuestion._key}`);
        res.sendStatus(201);
      } catch (err) {
        sendError(err, res);
      }
    });
}
