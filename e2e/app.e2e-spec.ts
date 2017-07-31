import { TechMaturityPage } from './app.po';

describe('tech-maturity App', () => {
  let page: TechMaturityPage;

  beforeEach(() => {
    page = new TechMaturityPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
