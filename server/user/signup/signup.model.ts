import { Database } from 'arangojs';
import User from '../user';

/**
 * Cadastra um novo usuário no app.
 */
function signup(newUser: User, db: Database): Promise<User> {
  const action = String(function (params: any) {
    const gm = require("@arangodb/general-graph");
    const graph = gm._graph('userGraph');
    const _ = require('underscore');

    const userData = _.omit(params, _.isUndefined);
    let user = graph.user.firstExample({ _key: userData._key });

    if (user === null) {
      // normalmente os usuários são criados no Auth0 e, então, seus dados vêm pra cá
      user = graph.user.save(userData);
    } else {
      // mas, em casos como o do usuário `admin`, o registro já existe no BD antes do Auth0
      user = graph.user.update(userData._key, userData);
    }

    return user;
  });

  const collections = { read: 'user', write: 'user' };
  return db.transaction(collections, action, newUser);
}

export default signup;
