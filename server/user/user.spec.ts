import { DeserializeKeysFrom, Deserialize } from 'cerialize';
import User from './user';

describe('User', function() {

  it('should translate Auth0 keys', function() {
    const json = {
      username: 'a',
      user_id: 'b',
      email_verified: 1,
      created_at: (new Date()).toISOString(),
      updated_at: (new Date()).toISOString(),
      name: 'foo',
    };

    DeserializeKeysFrom(User.keyTransformer);
    const user: User = Deserialize(json, User);
    DeserializeKeysFrom(null as any);

    expect(json.username).toBe(user._key);
    expect(json.user_id).toBe(user.auth0Id);
    expect(json.email_verified).toBe(user.emailVerified);
    expect(json.created_at).toBe(user.createdAt.toISOString());
    expect(json.updated_at).toBe(user.updatedAt.toISOString());
    expect(json.name).toBe(user.name);
  });

});
