import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentcreateComponent } from './studentcreate.component';

describe('CreateComponent', () => {
  let component: StudentcreateComponent;
  let fixture: ComponentFixture<StudentcreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
