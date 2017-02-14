/**
 * Esta rule garante que, no primeiro login, o novo usuário será criado também no nosso ArangoDB.
 * Ela é executada em cada login bem sucedido, por isso no início checa se o usuário já foi processado.
 */
export function signupOnArango(user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.signedUp || context.connection !== 'RE-Users') {
    console.log('ignoring rule for user', user.user_id, 'connection', context.connection);
    return callback(null, user, context);
  }

  var request = require('request-promise');

  // traduz as propriedades para o formato que usamos no ArangoDB
  var body = {
    _key: user.username,
    auth0Id: user.user_id,
    email: user.email,
    name: user.name,
    emailVerified: user.email_verified,
    picture: user.picture,
    nickname: user.nickname,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };

  var options = {
    method: 'POST',
    uri: 'https://representativo.localtunnel.me/api/user/signup',
    body: body,
    json: true
  };
  
  console.log('the request', options);
  
  request(options)
    .then(function (parsedBody) {
      console.log('the response', parsedBody);
      user = Object.assign(user, parsedBody);
      user.app_metadata.signedUp = true;
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          console.log('metadata updated', user.app_metadata);
          callback(null, user, context);
        })
        .catch(function(err){
          console.log('err updating metadata', err.message);
          callback(err);
        });
    })
    .catch(function (err) {
      console.log('err on request', err.message);
      callback(err);
    });

}
