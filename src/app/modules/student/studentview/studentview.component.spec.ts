import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentviewComponent } from './studentview.component';

describe('StudentviewComponent', () => {
  let component: StudentviewComponent;
  let fixture: ComponentFixture<StudentviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
