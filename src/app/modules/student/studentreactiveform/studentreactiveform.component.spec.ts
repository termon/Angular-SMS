import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentreactiveformComponent } from './studentreactiveform.component';

describe('StudentreactiveformComponent', () => {
  let component: StudentreactiveformComponent;
  let fixture: ComponentFixture<StudentreactiveformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentreactiveformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentreactiveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
