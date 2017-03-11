import { $, browser, until, by } from 'protractor';

export class LoginPO {

  url = 'login';

  navigateTo() {
    return browser.get(`/${this.url}`);
  }

  get subtitle() {
    return $('md-card > h3').getText();
  }

  login() {
    const usernameIsLocated = until.elementLocated(by.css('input[name=username]'));
    return browser.driver.wait(usernameIsLocated, 10000)
      .then(username => browser.driver.wait(until.elementIsVisible(username), 10000))
      .then(() => {
        $('input[name=username]').sendKeys(process.env.TEST_USERNAME);
        $('input[name=password]').sendKeys(process.env.TEST_PASSWORD);
        $('button[type=submit]').click();
        // We know login is done when the logout button appears
        return browser.driver.wait(until.elementLocated(by.id('logoutButton')), 10000);
      });
  }

  reLogin() {
    const loginButtonIsLocated = until.elementLocated(by.css('.auth0-lock-last-login-pane > button'));
    return browser.driver.wait(loginButtonIsLocated, 10000)
      .then(button => {
        button.click();
        // We know login is done when the logout button appears
        return browser.driver.wait(until.elementLocated(by.id('logoutButton')), 10000);
      });
  }

}
