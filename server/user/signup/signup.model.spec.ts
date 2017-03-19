import signup from './signup.model';
import User from '../user';

describe('Signup Model', function () {

  beforeEach(function(){
    const user = new User('huvs', process.env.TEST_USER_ID);
    user.email = 'huvs@example.com';
    this.user = user;
  });

  it('should save a new user on DB', async function (done) {
    try {
      const savedUser = await signup(this.user, this.testDB);
      expect(savedUser._key).toEqual(this.user._key);
      expect(savedUser._rev).toBeTruthy();
      this.user = savedUser;
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should update an existing user on DB', async function (done) {
    try {
      const savedUser = await signup(this.user, this.testDB);
      expect(savedUser._key).toEqual(this.user._key);
      expect(savedUser._rev).not.toEqual(this.user._rev);
      expect(savedUser._rev).toBeTruthy();
      done();
    } catch (err) {
      done.fail(err);
    }
  });

});
