import { Subject } from 'rxjs/Subject';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let mockService: any, mockRouter: any;

  beforeEach(function () {
    mockService = {
      auth: true,
      get authenticated() { return this.auth; },
      displayLoginForm: jasmine.createSpy('displayLoginForm'),
      user: new Subject(),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    component = new LoginComponent(mockService, mockRouter);
  });

  it('should display login form when user is unknown', () => {
    mockService.auth = false;
    expect(mockService.displayLoginForm).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(mockService.displayLoginForm).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not display login form when user is authenticated', () => {
    mockService.auth = true;
    expect(mockService.displayLoginForm).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(mockService.displayLoginForm).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect the user on login', () => {
    component.ngOnInit();
    mockService.user.next();
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
  });

});
