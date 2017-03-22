import { $, browser, until, by } from 'protractor';

export class LoginPO {

  url = 'login';

  navigateTo() {
    return browser.get(`/${this.url}`);
  }

  get subtitle() {
    return $('md-card > h3').getText();
  }

  async login() {
    const usernameIsLocated = until.elementLocated(by.css('input[name=username]'));
    const username = await browser.driver.wait(usernameIsLocated, 10000);
    await browser.driver.wait(until.elementIsVisible(username), 10000);
    await $('input[name=username]').sendKeys(process.env.TEST_USERNAME);
    await $('input[name=password]').sendKeys(process.env.TEST_PASSWORD);
    await $('button[type=submit]').click();
    // We know login is done when the logout button appears
    return browser.driver.wait(until.elementLocated(by.id('logoutButton')), 10000);
  }

  async reLogin() {
    const loginButtonIsLocated = until.elementLocated(by.css('.auth0-lock-last-login-pane > button'));
    const button = await browser.driver.wait(loginButtonIsLocated, 10000);
    await button.click();
    // We know login is done when the logout button appears
    return browser.driver.wait(until.elementLocated(by.id('logoutButton')), 10000);
  }

}
