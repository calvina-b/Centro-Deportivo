import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereesListComponent } from './referees-list.component';

describe('RefereesListComponent', () => {
  let component: RefereesListComponent;
  let fixture: ComponentFixture<RefereesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefereesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
