
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import factory from './auth-http-factory';

describe('authHttpFactory', function () {

  it('should create the http service', function () {
    const opts = new BaseRequestOptions();
    const service = factory(new Http(new MockBackend(), opts), opts);
    expect(service).toBeTruthy();
  });

});
