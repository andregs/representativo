import { QuestionService } from './question.service';
import { Observable } from 'rxjs/Observable';

describe('QuestionService', function () {

  beforeEach(function () {
    this.http = { post: jasmine.createSpy('post') };
  });

  it('should submit a new q & a', function (done) {
    (this.http.post as jasmine.Spy).and.returnValue(
      Observable.of({ headers: { get: () => 'ok' } }),
    );
    const service = new QuestionService(this.http as any);
    const res = service.ask(null, null);
    expect(this.http.post).toHaveBeenCalled();
    res.subscribe(val => {
      expect(val).toBe('ok');
      done();
    });
  });

});
