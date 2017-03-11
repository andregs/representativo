import { browser } from 'protractor';
import { ToolbarPO } from './po/toolbar.po';

describe('Toolbar Component', function () {
  let page: ToolbarPO;

  beforeEach(function () {
    page = new ToolbarPO();
  });

  it('should browse to the user profile', function () {
    page.goToProfile();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "perfil");
  });

  it('should browse to the home page', function () {
    page.goToHome();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
  });

});
