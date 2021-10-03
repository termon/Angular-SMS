import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { LogService } from 'src/app/core/services/log.service';

import { Register } from '../models/Register';
import { Role } from '../models/Role';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit, OnChanges {
  form: FormGroup;

  roles = Role.values();
  model: Register = new Register();

  // @Input() model = new Register();
  // @Output() saveEmitter = new EventEmitter<Register>();
  // @Output() cancelEmitter = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private log: LogService
  ) {}

  ngOnInit(): void {
    // create form
    this.form = this.fb.group({
      name: ['Test', [Validators.required]],
      email: ['test@mail.com', [Validators.required, Validators.email], [this.emailAvailableAsync()]],
      password: ['test', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['test', [Validators.required]],
      role: ['Manager', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
  });
  }

  // update model from form and emit event
  // onSubmit(): void {
  //   this.model.name = this.f.name.value;
  //   this.saveEmitter.emit(this.model);
  // }

  // onCancel(): void {
  //   this.cancelEmitter.emit();
  // }

  onCancel(): void {
    this.toastr.success('Registration Cancelled');
    this.router.navigate(['/auth/login']);
  }

  onSubmit(): void {
    this.model.name = this.f.name.value;
    this.model.email = this.f.email.value;
    this.model.password = this.f.password.value;
    this.model.confirmPassword = this.f.confirmPassword.value;
    this.model.role = this.f.role.value;

    this.service.register(this.model)
        .subscribe(
          s => {
            this.toastr.success('Successfully registered');
            this.router.navigate(['/auth/login']);
          },
          e => {
            this.toastr.error(e.message);
            this.log.error('Register', e);
          }
        );
  }


  // handle model async update after form has been created and patch form values
  // alternative approach is to subscribe to this.service.current$ observable
  // and create form in subscription. Unsubscribe in ngOnDestroy
  ngOnChanges(changes): void {
    if (changes.model && this.form) {
      this.form.patchValue( {
        name: this.model.name,
        email: this.model.email,
        password: this.model.password,
        confirmPassword: this.model.confirmPassword,
        role: this.model.role
      });
      // force validators to run when form loaded
      this.form.markAllAsTouched();
    }
  }

  // convenience getter for easy access to form fields
  get f(): {[key: string]: AbstractControl } { return this.form.controls; }

  // async validator verifies if email entered is available (not already registered)
  private emailAvailableAsync(): any {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.service.verifyEmailAvailable(control.value)
        .pipe( debounceTime(1000), map( available => available ? null : { emailNotAvailable: true }));
    };
  }

  // validator matches value of two fields (password, confirmPassword)
  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

}
