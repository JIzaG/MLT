import { AppPage } from './app.po';

describe('Salud Dental', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('MyLittleTooth', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Bienvenido a MyLittleTooth!');
  });
});
