import { AngularCalcPage } from './app.po';

describe('angular-calc App', () => {
  let page: AngularCalcPage;

  beforeEach(() => {
    page = new AngularCalcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
