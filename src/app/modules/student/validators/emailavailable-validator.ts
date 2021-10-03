import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, first } from 'rxjs/operators';

import { StudentService } from '../services/student.service';

@Directive({
    selector: '[emailAvailableValidator][ngModel],[emailAvailableValidator][FormControl]',
    providers: [
        {provide: NG_ASYNC_VALIDATORS, useExisting: EmailAvailableValidator, multi: true}
    ]
})
export class EmailAvailableValidator implements AsyncValidator {
    // pass in id of owner to exclude in validation request
    @Input('emailAvailableValidator') id: number;

    constructor(private service: StudentService) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return control.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => this.service.verifyEmailAvailable(value, this.id)),
                map( emailAvailable => emailAvailable ? null : { emailAvailableValidator: true }),
                first() // important to make observable finite
            );
    }
}
