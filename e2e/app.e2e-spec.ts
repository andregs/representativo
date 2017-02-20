import { RepresentativoPage } from './app.po';

describe('representativo App', function() {
  let page: RepresentativoPage;

  beforeEach(() => {
    page = new RepresentativoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Representativo');
  });
});
