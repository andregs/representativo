import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { CoreModule } from '../core.module';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, RouterTestingModule],
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

});
