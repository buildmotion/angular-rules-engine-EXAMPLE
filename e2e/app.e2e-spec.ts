import { AngularRulesEngineEXAMPLEPage } from './app.po';

describe('angular-rules-engine-example App', function() {
  let page: AngularRulesEngineEXAMPLEPage;

  beforeEach(() => {
    page = new AngularRulesEngineEXAMPLEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
