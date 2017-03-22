import { browser } from 'protractor';
import { LoginPO } from './po/login.po';
import { ToolbarPO } from './po/toolbar.po';

beforeAll(async function () {
  const login = new LoginPO();
  await login.navigateTo();
  await login.login();
  this.login = login;
  this.toolbar = new ToolbarPO();
});

describe('Login Route', function () {
  let login: LoginPO;
  let toolbar: ToolbarPO;

  beforeAll(function() {
    login = this.login;
    toolbar = this.toolbar;
  });

  it('should not be authenticated yet', async function () {
    await toolbar.logout();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + login.url);
    expect(await toolbar.logoutElm.isPresent()).toBeFalsy();
    expect(await toolbar.profileElm.isPresent()).toBeFalsy();
  });

  it('should have the proper logo & subtitle', async function () {
    expect(await toolbar.logoText).toBe('Representativo');
    expect(await login.subtitle).toMatch(/Bem-vindo ao Representativo/);
  });

  it('should login the user', async function () {
    await login.reLogin();
    expect(await toolbar.profileIcon).toBe('person');
    expect(await toolbar.logoutIcon).toBe('power_settings_new');
  });

  it('should redirect the user after login', async function () {
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl);
  });

});
