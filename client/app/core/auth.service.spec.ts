import { EventEmitter } from 'events';
import { AuthService } from './auth.service';

class MockWindow extends EventEmitter {
  localStorage = {
    getItem: str => str,
    setItem: str => str,
    removeItem: str => str,
  };
}

class MockLock {
  show = jasmine.createSpy('show');
  hide = jasmine.createSpy('hide');
  on = jasmine.createSpy('on');
  getUserInfo = jasmine.createSpy('getUserInfo');
}

let authenticated = false;
function isAuthenticated(result = false) {
  return authenticated = result;
}

describe('AuthService', () => {
  let service: AuthService;

  describe('creation without an authenticated user', function () {
    beforeEach(() => {
      service = new AuthService(new MockWindow() as any, MockLock, isAuthenticated);
    });

    it('should load the service but not the user', function () {
      expect(service).toBeTruthy();
      service.tryAutomaticLogin();
      expect(service.authenticated).toBeFalsy();
    });
  });

  describe('creation with an authenticated user', function () {
    beforeEach(() => {
      service = new AuthService(new MockWindow() as any, MockLock, isAuthenticated);
    });

    it('should load both the service & the user', function () {
      // Sobrescreve o getter. Desnecessário qdo publicarem isto:
      // https://github.com/jasmine/jasmine/issues/943
      Object.defineProperty(
        Object.getPrototypeOf(service),
        'authenticated',
        { get: () => true },
      );

      expect(service).toBeTruthy();
      service.tryAutomaticLogin();
      expect(service.authenticated).toBeTruthy();
    });
  });
});
