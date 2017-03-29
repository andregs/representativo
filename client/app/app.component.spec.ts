import { AppComponent } from './app.component';
import { Subject } from 'rxjs/Subject';

describe('AppComponent', () => {

  let component: AppComponent;
  let mockAuthService, mockRouter, logout$: Subject<{}>;

  beforeEach(() => {
    logout$ = new Subject();
    mockAuthService = {
      tryAutomaticLogin: jasmine.createSpy('tryAutomaticLogin'),
      onLogout() { return logout$; },
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };
    component = new AppComponent(mockAuthService, mockRouter);
  });

  it('should try login on init', function () {
    component.ngOnInit();
    expect(mockAuthService.tryAutomaticLogin).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate on logout', function () {
    component.ngOnInit();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    logout$.next();
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
  });

});
