import signup from './signup.model';
import { Database } from 'arangojs';

describe('Signup Model', function () {

  it('should save a user', function (done) {
    expect(true).toBeTruthy();

    const user = {
      _key: 'huvs',
      name: 'nivs'
    };

    signup(user, this.db)
      .then(savedUser => {
        console.log('user >>>>', user, savedUser._id, savedUser.auth0Id);
        done();
      })
      .catch(done.fail);
  });

});
