import signup from './signup.model';
import { Database } from 'arangojs';
import User from '../user';

describe('Signup Model', function () {

  let user = new User('huvs');
  user.email = 'huvs@example.com';

  it('should save a new user on DB', async function (done) {
    try {
      const savedUser = await signup(user, this.db);
      expect(savedUser).toEqual(jasmine.objectContaining(user));
      expect(savedUser._rev).toBeTruthy();
      user = savedUser;
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should update an existing user on DB', async function (done) {
    try {
      const savedUser = await signup(user, this.db);
      expect(savedUser._key).toEqual(user._key);
      expect(savedUser._rev).not.toEqual(user._rev);
      expect(savedUser._rev).toBeTruthy();
      done();
    } catch (err) {
      done.fail(err);
    }
  });

});
