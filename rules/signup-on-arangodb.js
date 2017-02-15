function signupOnArango(user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.signedUp || context.connection !== 'RE-Users') {
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

  request(options)
    .then(function (parsedBody) {
      user.app_metadata.signedUp = true;
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          callback(null, user, context);
        })
        .catch(function(err){
          callback(err);
        });
    })
    .catch(function (err) {
      callback(err);
    });

}
