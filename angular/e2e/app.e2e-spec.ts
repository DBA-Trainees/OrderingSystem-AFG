import { OrderingSystemAFGTemplatePage } from './app.po';

describe('OrderingSystemAFG App', function() {
  let page: OrderingSystemAFGTemplatePage;

  beforeEach(() => {
    page = new OrderingSystemAFGTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
