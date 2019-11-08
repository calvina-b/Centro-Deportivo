import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereesFormComponent } from './referees-form.component';

describe('RefereesFormComponent', () => {
  let component: RefereesFormComponent;
  let fixture: ComponentFixture<RefereesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefereesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
