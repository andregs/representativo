import { Http, BaseRequestOptions, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { QuestionService } from './question.service';

describe('QuestionService', function () {
  let service: QuestionService;
  let backend: MockBackend;

  beforeEach(function () {
    backend = new MockBackend();
    const http = new Http(backend, new BaseRequestOptions());
    service = new QuestionService(http as any);
  });

  it('should submit a new q & a', function (done) {
    backend.connections.subscribe((c: MockConnection) => {
      expect(service.endpoint).toMatch(c.request.url);
      c.mockRespond(new Response(new ResponseOptions({
        headers: new Headers({ Location: `${c.request.url}/123` }),
      })));
    });

    service.ask(null as any, null as any).subscribe(
      location => {
        expect(location).toMatch(`${service.endpoint}/123`);
        done();
      },
    );
  });

});
