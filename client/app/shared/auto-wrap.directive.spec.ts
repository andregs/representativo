import { AutoWrapDirective } from './auto-wrap.directive';

describe('AutoWrapDirective', function () {
  let directive: AutoWrapDirective;

  beforeEach(function () {
    directive = new AutoWrapDirective(
      { nativeElement: { rows: 2, style: {} } },
    );
  });

  it('should resize on input', function () {
    const spy = spyOn(directive, 'resize');
    directive.onInput();
    expect(spy).toHaveBeenCalled();
  });

  it('should resize on window:resize', function () {
    const spy = spyOn(directive, 'resize');
    directive.onWindowResize();
    expect(spy).toHaveBeenCalled();
  });

  it("should resize a textarea when it has a scrollbar", function () {
    const ta = {} as any;
    ta.rows = 9;
    ta.scrollHeight = 30 * 3;
    ta.clientHeight = 30;
    directive.resize(ta);
    expect(ta.rows).toBe(6);
  });

  it('should not resize when not needed', function () {
    const ta = {} as any;
    directive.resize(ta);
    expect(ta.rows).toBe(2);
    expect(ta.scrollHeight).toBe(ta.clientHeight);
  });

});
