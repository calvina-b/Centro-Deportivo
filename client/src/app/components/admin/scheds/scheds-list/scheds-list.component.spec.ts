import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedsListComponent } from './scheds-list.component';

describe('SchedsListComponent', () => {
  let component: SchedsListComponent;
  let fixture: ComponentFixture<SchedsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
