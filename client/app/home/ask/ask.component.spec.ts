import { Observable } from 'rxjs/Observable';
import { AskComponent } from './ask.component';
import { QuestionService } from '../question.service';

describe('AskComponent', function () {

  beforeEach(function () {
    const ask = jasmine.createSpy('ask').and.returnValue(Observable.of({}));
    this.service = { ask };
    const component = new AskComponent(this.service as any);
    component.qForm = {} as any;
    component.aForm = {} as any;
    this.component = component;
  });

  it('should have empty q & a', function () {
    const component = this.component as AskComponent;
    expect(component.question.title).toBeUndefined();
    expect(component.answer.chosen).toBeUndefined();
    expect(component.step).toBe('asking');
  });

  it('should refuse an invalid question', function () {
    const component = this.component as AskComponent;
    component.qForm.valid = false;
    component.onAsk();
    expect(component.step).toBe('asking');
  });

  it('should accept a valid question', function () {
    const component = this.component as AskComponent;
    component.qForm.valid = true;
    component.onAsk();
    expect(component.step).toBe('answering');
  });

  it('should refuse an invalid answer', function () {
    const component = this.component as AskComponent;
    const service = this.service as QuestionService;
    component.aForm.valid = false;
    component.onAnswer();
    expect(service.ask).not.toHaveBeenCalled();
  });

  it('should submit valid q & a', function () {
    const component = this.component as AskComponent;
    const service = this.service as QuestionService;
    component.qForm.valid = true;
    component.aForm.valid = true;
    component.onAnswer();
    expect(service.ask).toHaveBeenCalled();
  });

});
