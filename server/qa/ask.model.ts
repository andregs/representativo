import { Database } from 'arangojs';
import Question from './question';
import Answer from './answer';
import ModelError from '../shared/model-error';

/**
 * Salva uma nova pergunta na base de dados.
 * @param question a nova pergunta
 * @param answer a resposta do usuário para a pergunta
 * @param questioner auth0Id do usuário autenticado
 * @param db banco onde os dados serão salvos
 */
function ask(question: Question, answer: Answer, questioner: string, db: Database): Promise<Question> {

  if (!question.valid || !answer.valid) {
    throw new ModelError();
  }

  interface Params {
    question: Question;
    answer: Answer;
    questioner: string;
  }

  const p = { question, answer, questioner } as Params;
  /* istanbul ignore next because it's a string */
  const action = String(function (params: Params) {
    const gm = require('@arangodb/general-graph');
    const graph = gm._graph('qaGraph');
    const _ = require('underscore');

    const questionData = _.pick(params.question, 'title', 'options');
    questionData.createdAt = new Date();
    questionData.updatedAt = new Date();

    const answerData = _.pick(params.answer, 'chosen', 'opinion');
    answerData.createdAt = new Date();
    answerData.updatedAt = new Date();

    const auth0Id = params.questioner;
    const user = graph.user.firstExample({ auth0Id });
    const created = graph.question.save(questionData) as Question;
    graph.answer.save(user._id, created._id, answerData);
    graph.questioner.save(created._id, user._id, {});

    return created;
  });

  const collections: any = {
    read: 'user',
    write: ['question', 'answer', 'questioner'],
  };
  return db.transaction(collections, action, p as any);
}

export default ask;
