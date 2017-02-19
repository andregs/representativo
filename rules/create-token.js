/**
 * Esta rule gera o token JWT que as demais rules precisam para acessar à nossa API.
 */
// eslint-disable-next-line no-unused-vars
function createToken(user, context, callback) {
  var options = {
    subject: user.user_id,
    expiresInMinutes: 1,
    audience: configuration.CLIENT_ID,
    issuer: configuration.JWT_ISSUER // like https://{your auth0 account}.auth0.com
  };
  user.idToken = jwt.sign(
    { username: user.username },
    new Buffer(configuration.CLIENT_SECRET, 'base64'),
    options
  );
  callback(null, user, context);
}
