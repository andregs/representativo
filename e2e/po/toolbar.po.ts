import { $ } from 'protractor';

export class ToolbarPO {

  logoElm = $('#logo');
  profileElm = $('#profileButton');
  logoutElm = $('#logoutButton');

  get logoText() {
    return this.logoElm.getText();
  }

  get profileIcon() {
    return this.profileElm.getText();
  }

  get logoutIcon() {
    return this.logoutElm.getText();
  }

  goToHome() {
    return this.logoElm.click();
  }

  goToProfile() {
    return this.profileElm.click();
  }

  logout() {
    return this.logoutElm.click();
  }

}
