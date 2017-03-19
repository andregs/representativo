import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/auth.service';
import { AskComponent } from './ask/ask.component';
import { QuestionService } from './question.service';
import { Observable } from 'rxjs/Observable';

class MockAuthService {
  user = Observable.of({});
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: QuestionService, useValue: {} },
      ],
      declarations: [HomeComponent, AskComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
