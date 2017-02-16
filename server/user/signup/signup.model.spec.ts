import signup from './signup.model';
import { Database } from 'arangojs';
import User from '../user';

describe('Signup Model', function () {

  let user = new User('huvs');
  user.email = 'huvs@example.com';

  it('should save a new user on DB', function (done) {
    signup(user, this.db)
      .then(savedUser => {
        expect(savedUser).toEqual(jasmine.objectContaining(user));
        expect(savedUser._rev).toBeTruthy();
        user = savedUser;
        done();
      })
      .catch(done.fail);
  });

  it('should update an existing user on DB', function (done) {
    signup(user, this.db)
      .then(savedUser => {
        expect(savedUser._key).toEqual(user._key);
        expect(savedUser._rev).not.toEqual(user._rev);
        expect(savedUser._rev).toBeTruthy();
        done();
      })
      .catch(done.fail);
  });

});
