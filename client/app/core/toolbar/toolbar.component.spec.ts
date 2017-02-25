import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { CoreModule } from '../core.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ToolbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to profile page', () => {
    const router = fixture.debugElement.injector.get(Router) as Router;
    spyOn(router, 'navigate');
    expect(router.navigate).not.toHaveBeenCalled();
    component.goToProfile();
    expect(router.navigate).toHaveBeenCalled();
  });

});
