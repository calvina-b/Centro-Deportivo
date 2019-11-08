import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedsFormComponent } from './scheds-form.component';

describe('SchedsFormComponent', () => {
  let component: SchedsFormComponent;
  let fixture: ComponentFixture<SchedsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
