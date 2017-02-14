import { Database } from 'arangojs';

/**
 * Cadastra um novo usuário no app.
 *
 * TODO cerialize no userBody?
 */
function signup(userBody: any, db: Database) {
  const action = String(function (params) {
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
    user = Object.assign(userData, user);

    user = graph.user.firstExample({ _key: user._key });
    return user;
  });

  const collections = { read: 'user', write: 'user' };
  return db.transaction(collections, action, userBody);
}

export default signup;
