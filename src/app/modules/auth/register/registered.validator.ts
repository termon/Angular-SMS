import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Directive({
    selector: '[registeredValidator][ngModel],[registeredValidator][FormControl]',
    providers: [
        {provide: NG_ASYNC_VALIDATORS, useExisting: RegisteredValidator, multi: true}
    ]
})
export class RegisteredValidator implements AsyncValidator {

    constructor(private service: AuthService) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return control.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => this.service.verifyEmailAvailable(value)),
                map( emailAvailable => emailAvailable ? null : { registeredValidator: true }),
                first() // important to make observable finite
            );
    }
}

