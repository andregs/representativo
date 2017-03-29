import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', function () {

  it('should redirect to the user profile', function () {
    const mock = { navigate: jasmine.createSpy('navigate') };
    const component = new ToolbarComponent({} as any, mock as any);
    component.goToProfile();
    expect(mock.navigate).toHaveBeenCalledTimes(1);
  });

});
