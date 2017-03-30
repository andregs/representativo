import { EventEmitter } from 'events';
import { AuthService } from './auth.service';
import { mockGetter } from '../../../server/helpers/functions';
import { Observable } from 'rxjs/Observable';

class MockWindow extends EventEmitter {
  localStorage = {
    getItem: jasmine.createSpy('getItem'),
    setItem: jasmine.createSpy('setItem'),
    removeItem: jasmine.createSpy('removeItem'),
  };
}

class MockLock {
  show = jasmine.createSpy('show');
  hide = jasmine.createSpy('hide');
  on = jasmine.createSpy('on');
  mockUser = { username: 'huvs', created_at: new Date().toISOString() };
  getUserInfo(accessToken, callback) {
    return accessToken === 'valid'
      ? callback(null, this.mockUser)
      : callback(new Error());
  }
}

let authenticated = false;
function isAuthenticated() {
  return authenticated;
}

describe('AuthService', () => {
  let service: AuthService, window: MockWindow;

  describe('creation without an authenticated user', function () {
    beforeEach(() => {
      authenticated = false;
      window = new MockWindow();
      service = new AuthService(window as any, MockLock, isAuthenticated);
    });

    it('should load the service but not the user', function () {
      spyOn(service, 'createLock');
      service.tryAutomaticLogin();
      expect(service.authenticated).toBeFalsy();
      expect(service.createLock).not.toHaveBeenCalled();
    });

    it('should display a login form', function () {
      const mockLock = service.createLock('login') as MockLock;
      spyOn(service, 'createLock').and.returnValue(mockLock);
      service.displayLoginForm('a', true, false);
      expect(mockLock.on).toHaveBeenCalledTimes(3);
      expect(mockLock.show).toHaveBeenCalledTimes(1);
    });
  });

  describe('creation with an authenticated user', function () {
    beforeEach(() => {
      authenticated = true;
      window = new MockWindow();
      service = new AuthService(window as any, MockLock, isAuthenticated);
    });

    it('should load both the service & the user', function (done) {
      const mockLock = service.createLock() as MockLock;
      spyOn(service, 'createLock').and.returnValue(mockLock);
      window.localStorage.getItem.and.returnValue('valid');
      service.user.subscribe(user => {
        expect(user._key).toBe(mockLock.mockUser.username);
        expect(user.createdAt.toISOString()).toBe(mockLock.mockUser.created_at);
        done();
      });
      expect(service.authenticated).toBeTruthy();
      service.tryAutomaticLogin();
    });

    it('should display error when Auth0 fails', function() {
      const mockLock = service.createLock() as MockLock;
      spyOn(service, 'createLock').and.returnValue(mockLock);
      window.localStorage.getItem.and.returnValue('INVALID');
      service.tryAutomaticLogin();
      expect(mockLock.show).toHaveBeenCalledTimes(1);
      expect(mockLock.show.calls.first().args[0].flashMessage.type).toBe('error');
    });

    it('should logout', function () {
      const userSpy = mockGetter(service, 'user', () => Observable.of({}));
      service.logout();
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('accessToken');
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('id_token');
      expect(userSpy).toHaveBeenCalledTimes(1);
    });
  });
});
