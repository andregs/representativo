import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

/**
 * Instancia um serviço {@link AuthHttp} configurando JSON como tipo padrão
 * de requisição.
 */
export default function authHttpFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}
