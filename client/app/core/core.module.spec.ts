import { CoreModule } from './core.module';

describe('CoreModule', function () {

  it('should load CoreModule only once', function () {
    let core, coreWithParent, exception;

    try {
      core = new CoreModule(null);
      coreWithParent = new CoreModule(core);
    } catch (e) {
      exception = e;
    } finally {
      expect(core).toBeTruthy();
      expect(coreWithParent).toBeUndefined();
      expect(exception).toBeTruthy();
    }
  });

});
