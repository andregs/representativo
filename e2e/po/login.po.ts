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
    await browser.waitForAngularEnabled(false); // Auth0 não é Angular
    const usernameIsLocated = until.elementLocated(by.css('input[name=username]'));
    const username = browser.driver.wait(usernameIsLocated, 10000, "where's the username field?");
    const loginButtonIsLocated = until.elementLocated(by.css('.auth0-lock-last-login-pane > button'));
    const button = browser.driver.wait(loginButtonIsLocated, 10000, "where's the login button?");

    const element = await Promise.race([username, button]);
    await browser.driver.wait(until.elementIsVisible(element), 5000);

    if (await element.getTagName() === 'input') {
      // o widget de login do Auth0 às vezes exige que vc entre com usuário e senha
      await $('input[name=username]').sendKeys(process.env.TEST_USERNAME);
      await $('input[name=password]').sendKeys(process.env.TEST_PASSWORD);
      await $('button[type=submit]').click();
    } else {
      // mas às vezes ele exige apenas que vc clique num botão p/ repetir o último login
      await element.click();
    }

    // sabemos que o login acabou quando aparecer o botão de logout
    const logoutIsLocated = until.elementLocated(by.id('logoutButton'));
    await browser.driver.wait(logoutIsLocated, 10000, "where's the logout button?");
    await browser.driver.sleep(1500);
    await browser.waitForAngularEnabled(true); // de volta ao Angular
  }

}
