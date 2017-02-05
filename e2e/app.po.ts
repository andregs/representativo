import { browser, element, by } from 'protractor';

export class RepresentativoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('re-root h1')).getText();
  }
}
