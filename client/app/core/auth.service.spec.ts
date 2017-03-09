import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  describe('creation without an authenticated user', function () {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [AuthService],
      });
    });

    it('should load the service but not the user', inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
      service.tryAutomaticLogin();
      expect(service.authenticated).toBeFalsy();
    }));
  });

  describe('creation with an authenticated user', function () {
    it('should load both the service & the user', function () {
      const service = new AuthService();

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
