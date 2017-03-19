/**
 * Esta rule gera o token JWT que as demais rules precisam para acessar à nossa API.
 */
// eslint-disable-next-line no-unused-vars
function createToken(user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  if (context.connection !== 'RE-Users') { // || user.app_metadata.signedUp
    console.log('ignoring rule for user', user.user_id, 'connection', context.connection);
    return callback(null, user, context);
  }

  var options = {
    subject: user.user_id,
    expiresInMinutes: 1,
    audience: configuration.CLIENT_ID,
    issuer: configuration.JWT_ISSUER // like https://{your auth0 account}.auth0.com/
  };
  user.idToken = jwt.sign(
    { username: user.username },
    configuration.CLIENT_SECRET,
    options
  );
  callback(null, user, context);
}
