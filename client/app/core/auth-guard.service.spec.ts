import { AuthGuard } from './auth-guard.service';

describe('AuthGuard', () => {
  let mockAuth: any, mockRouter: any, service: AuthGuard;

  beforeEach(function () {
    mockAuth = { authenticated: true };
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };
    service = new AuthGuard(mockAuth as any, mockRouter as any);
  });

  it('should allow authenticated users', async function (done) {
    mockAuth.authenticated = true;
    expect(await service.canActivate()).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    done();
  });

  it('should navigate unauthenticated users to login', async function (done) {
    mockAuth.authenticated = false;
    expect(await service.canActivate()).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    done();
  });
});
