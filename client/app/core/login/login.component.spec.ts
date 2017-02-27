import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { CoreModule } from '../core.module';
import tryUntil from '../../../helper/try-until';
import setInputValue from '../../../helper/set-input-value';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    service = fixture.debugElement.injector.get(AuthService);
    component = fixture.componentInstance;
    component.auth0Redirect = false;
    component.auth0Remember = false;
    localStorage.clear();
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  // FIXME isto deveria funcionar, tanto no Chrome quanto no Nightmare
  xit('should login the user', function (done) {
    // não dá pra acessar pelo debugElement pq o widget do auth0 é react,
    // então uso este helper para pesquisar direto na DOM
    tryUntil(fixture, 'button[type=submit]')
      .map(submit => {
        return {
          username: fixture.nativeElement.querySelector('input[name=username]'),
          password: fixture.nativeElement.querySelector('input[name=password]'),
          submit
        };
      })
      .do(el => {
        expect(service.authenticated).toBe(false, 'not logged in yet');
        setInputValue(el.username, process.env.TEST_USERNAME);
        setInputValue(el.password, process.env.TEST_PASSWORD);
        el.submit.click();
      })
      .flatMap(() => service.user)
      .subscribe(user => {
        expect(user._key).toBe(process.env.TEST_USERNAME);
        expect(user.auth0Id).toBeTruthy('got the auth0Id');
        expect(service.authenticated).toBe(true, "user's authenticated");
        done();
      });
  });
});
