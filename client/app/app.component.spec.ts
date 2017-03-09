import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/auth.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { Observable } from 'rxjs/Observable';

class MockAuthService {
  tryAutomaticLogin = jasmine.createSpy('tryAutomaticLogin');
  displayLoginForm = jasmine.createSpy('displayLoginForm');
  onLogout() {
    return Observable.of({});
  }
}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule, SharedModule, UserModule],
      declarations: [AppComponent],
    })
      .overrideModule(CoreModule, {
        set: {
          providers: [
            { provide: AuthService, useClass: MockAuthService },
          ],
        },
      });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Representativo'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Representativo');
  }));

  it('should try to log the user automatically', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const service = fixture.debugElement.injector.get(AuthService) as AuthService;
    fixture.detectChanges();
    expect(service.tryAutomaticLogin).toHaveBeenCalled();
  });
});
