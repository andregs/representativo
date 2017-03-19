/**
 * Esta rule garante que, no primeiro login, o novo usuário será criado também no nosso ArangoDB.
 * Ela é executada em cada login bem sucedido, por isso no início checa se o usuário já foi processado.
 */
// eslint-disable-next-line no-unused-vars
function signupOnArango(user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  if (context.connection !== 'RE-Users') { // || user.app_metadata.signedUp
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
    uri: configuration.APP_URL + '/api/user/signup',
    headers: {
      Authorization: 'Bearer ' + user.idToken
    },
    body: body,
    json: true
  };

  // limpa o token p/ que ele não seja enviado aos browsers no perfil do usuário
  user.idToken = undefined;

  console.log('the request', options);

  request(options)
    .then(function (parsedBody) {
      console.log('the response', parsedBody);
      user = Object.assign(user, parsedBody);
      user.app_metadata.signedUp = false;
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function () {
          console.log('metadata updated', user.app_metadata);
          callback(null, user, context);
        })
        .catch(function (err) {
          console.log('err updating metadata', err.message);
          callback('Erro interno do servidor');
        });
    })
    .catch(function (res) {
      console.log('err on request', res.message, res.error);
      callback('Erro interno do servidor');
    });

  // fire and forget to the dev server
  options.uri = configuration.DEV_URL + '/api/user/signup';
  //console.log('the dev request', options);
  request(options)
    //.then(function(res) { console.log('the dev response', res); })
    .catch(function (res) { console.log('err on dev request', res.message); });
}
