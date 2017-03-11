import { browser } from 'protractor';
import { LoginPO } from './po/login.po';
import { ToolbarPO } from './po/toolbar.po';

beforeAll(function () {
  const login = new LoginPO();
  login.navigateTo();
  login.login();
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

  it('should not be authenticated yet', function () {
    toolbar.logout();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + login.url);
    expect(toolbar.logoutElm.isPresent()).toBeFalsy();
    expect(toolbar.profileElm.isPresent()).toBeFalsy();
  });

  it('should have the proper logo & subtitle', function () {
    expect(toolbar.logoText).toBe('Representativo');
    expect(login.subtitle).toMatch(/Bem-vindo ao Representativo/);
  });

  it('should login the user', function () {
    login.reLogin();
    expect(toolbar.profileIcon).toBe('person');
    expect(toolbar.logoutIcon).toBe('power_settings_new');
  });

  it('should redirect the user after login', function () {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
  });

});
