import { ComponentFixture } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

/**
 * Procura pelo `cssSelector` até encontrar o elemento, então emite o `nativeElement`.
 */
export default function tryUntil<T>(fixture: ComponentFixture<T>, cssSelector: string): Observable<any> {
  return Observable.interval(250)
    .map(() => {
      fixture.detectChanges();
      return fixture.nativeElement.querySelector(cssSelector);
    })
    .filter(value => value !== null)
    .first();
}
