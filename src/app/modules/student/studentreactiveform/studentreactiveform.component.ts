import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { StudentService } from '../services/student.service';
import { StudentDto } from '../models/student';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

// Consider using @rxweb/reactive-form-validators
// https://medium.com/angular-in-depth/new-way-to-validate-the-angular-reactive-form-2c4fe4f13373
// https://medium.com/@oojhaajay/the-new-way-of-formgroup-data-binding-and-validate-nested-formgroup-and-formarray-in-angular-73fc9f2cdec5
@Component({
  selector: 'app-studentreactiveform',
  templateUrl: './studentreactiveform.component.html',
  styleUrls: ['./studentreactiveform.component.css']
})
export class StudentreactiveformComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Input() mode = 'create';
  @Input() model = new StudentDto();
  @Output() saveEmitter = new EventEmitter<StudentDto>();
  @Output() cancelEmitter = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: StudentService
  ) {}

  ngOnInit(): void {
    // create form
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.emailAvailableAsync()]],
      age: ['', [Validators.required, Validators.min(17), Validators.max(70)]],
      course: ['', [Validators.required]],
      photoUrl: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    });
  }

  // update model from form and emit event
  onSubmit(): void {
    this.model.name = this.f.name.value;
    this.model.email = this.f.email.value;
    this.model.age = this.f.age.value;
    this.model.course = this.f.course.value;
    this.model.photoUrl = this.f.photoUrl.value;
    this.saveEmitter.emit(this.model);
  }

  // handle model async update after form has been created and patch form values
  // alternative approach is to subscribe to this.service.current$ observable
  // and create form in subscription. Unsubscribe in ngOnDestroy
  ngOnChanges(changes): void {
    if (changes.model && this.form) {
      this.form.patchValue( {
        name: this.model.name,
        email: this.model.email,
        age: this.model.age,
        course: this.model.course,
        photoUrl: this.model.photoUrl,
      });
      // force validators to run when form loaded
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelEmitter.emit();
  }

  // convenience getter for easy access to form fields
  get f(): {[key: string]: AbstractControl } { return this.form.controls; }

  // async validator verifies if email entered is available (not already registered)
  private emailAvailableAsync(): any {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.service.verifyEmailAvailable(control.value, this.model.id)
        .pipe( debounceTime(1000), map( available => available ? null : { emailNotAvailable: true }));
    };
  }

}
