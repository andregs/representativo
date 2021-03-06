import { browser } from 'protractor';
import { LoginPO } from './po/login.po';
import { ToolbarPO } from './po/toolbar.po';

beforeAll(async function () {
  const login = new LoginPO();
  await login.navigateTo();
  await login.login();
});

(xdescribe('Login Route', function () {
  let login: LoginPO;
  let toolbar: ToolbarPO;

  beforeEach(function() {
    login = new LoginPO();
    toolbar = new ToolbarPO();
  });

  it('should not be authenticated yet', async function () {
    await toolbar.logout();
    expect(await browser.getCurrentUrl())
      .toEqual(browser.baseUrl + login.url);
    expect(await toolbar.logoutElm.isPresent())
      .toBeFalsy();
    expect(await toolbar.profileElm.isPresent())
      .toBeFalsy();
  });

  it('should have the proper logo & subtitle', async function () {
    expect(await toolbar.logoText)
      .toBe('Representativo');
    expect(await login.subtitle)
      .toMatch(/Bem-vindo ao Representativo/);
  });

  it('should login the user', async function () {
    await login.login();
    expect(await toolbar.profileIcon)
      .toMatch('person');
    expect(await toolbar.logoutIcon)
      .toMatch('power_settings_new');
  });

  it('should redirect the user after login', async function () {
    expect(await browser.getCurrentUrl())
      .toEqual(browser.baseUrl);
  });

}) as any)

// Acontece que, após o logout, alguns navegadores não conseguem fazer o login novamente.
// Quero tentar novamente depois que o https://github.com/angular/blocking-proxy/ evoluir.
.pend('Não funcionam bem on Sauce. Tentar novamente quando angular/blocking-proxy evoluir');
