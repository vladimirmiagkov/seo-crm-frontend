import { Rssp6FrontendPage } from './app.po';

describe('rssp6-frontend App', function() {
  let page: Rssp6FrontendPage;

  beforeEach(() => {
    page = new Rssp6FrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
