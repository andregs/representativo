function signupOnArango(user, context, callback) {
  // user.app_metadata = user.app_metadata || {};
  // if (user.app_metadata.signedUp || context.connection !== 'RE-Users') {
  if (context.connection !== 'RE-Users') {
    console.log('ignoring rule', context.connection);
    return callback(null, user, context);
  }

  var request = require('request-promise');
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
      callback(null, Object.assign(user, parsedBody), context);
    })
    .catch(function (err) {
      console.log('err on request', err.message);
      callback(err);
    });

}
