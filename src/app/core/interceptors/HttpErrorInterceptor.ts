import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LogService } from '../services/log.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private log: LogService,
        private spinner: NgxSpinnerService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // simulated delay to test spinner during requests
        this.spinner.show();
        setInterval( () => {
            this.spinner.hide();
        }, 500);

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status === 401) {
                    this.toastr.error('Not Authorised', 'Interceptor: Auth', {timeOut: 6000});
                }
                return event;
            }),
            catchError((response: HttpErrorResponse) => {
                this.log.error('HttpErrorInterceptor', response);
                this.toastr.error(response.error.detail,"Interceptor: " + response.error.title, {timeOut: 4000})
                return throwError(response.error);
            })
        );
    }
}
