import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentupdateComponent } from './studentupdate.component';

describe('StudentupdateComponent', () => {
  let component: StudentupdateComponent;
  let fixture: ComponentFixture<StudentupdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
