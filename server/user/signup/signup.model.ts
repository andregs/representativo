import { Database } from 'arangojs';

function signup(userBody: any, db: Database) {
  const action = String(function (params) {
    const gm = require("@arangodb/general-graph");
    const graph = gm._graph('userGraph');
    const _ = require('underscore');

    const userData = _.omit(params, _.isUndefined);
    console.log('user data', params, userData);
    let user = graph.user.firstExample({ _key: userData._key || 'foo' });
    console.log('user found?', user);

    if (user === null) { // first login (sign up)
      user = graph.user.save(userData);
    } else { // update existing user
      user = graph.user.update(userData._key, userData);
    }
    user = Object.assign(userData, user);
    console.log('saved', user);

    user = graph.user.firstExample({ _key: user._key });
    console.log('selected', user);
    return user;
  });

  const collections = { read: 'user', write: 'user' };
  console.log('transaction', collections, userBody);
  return db.transaction(collections, action, userBody);
}

export default signup;
