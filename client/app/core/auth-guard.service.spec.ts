import { AuthGuard } from './auth-guard.service';

class MockAuth {
  authenticated = true;
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthGuardService', () => {
  let authService: MockAuth, router: MockRouter, service: AuthGuard;

  beforeEach(function(){
    authService = new MockAuth();
    router = new MockRouter();
    service = new AuthGuard(authService as any, router as any);
  });

  it('should allow authenticated users', function () {
    expect(authService.authenticated).toBeTruthy();
    service.canActivate()
      .then(result => {
        expect(result).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
      });
  });

  it('should navigate unauthenticated users to login', function () {
    authService.authenticated = false;
    expect(authService.authenticated).toBeFalsy();
    service.canActivate()
      .then(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalled();
      });
  });
});
