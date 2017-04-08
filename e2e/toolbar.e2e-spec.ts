import { browser } from 'protractor';
import { ToolbarPO } from './po/toolbar.po';

describe('Toolbar Component', function () {
  let page: ToolbarPO;

  beforeEach(function () {
    page = new ToolbarPO();
  });

  it('should browse to the user profile', async function () {
    await page.goToProfile();
    expect(await browser.getCurrentUrl())
      .toEqual(browser.baseUrl + "perfil");
  });

  it('should browse to the home page', async function () {
    await page.goToHome();
    expect(await browser.getCurrentUrl())
      .toEqual(browser.baseUrl);
  });

});
