import { HomeComponent } from './home.component';
import { Observable } from 'rxjs/Observable';

describe('HomeComponent', function () {
  let component: HomeComponent;
  let user: Observable<any>;

  beforeEach(function () {
    user = Observable.of(true);
    component = new HomeComponent({ user } as any);
  });

  it('should get the authenticated user', function () {
    component.ngOnInit();
    expect(component.user).toBeTruthy();
  });

});
