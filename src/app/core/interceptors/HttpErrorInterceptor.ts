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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService, private log: LogService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status === 401) {
                    this.toastr.error('Not Authorised', 'Auth', {timeOut: 6000});
                }
                return event;
            }),
            catchError((response: HttpErrorResponse) => {
                this.log.error('HttpErrorInterceptor', response.error);
                return throwError(response.error);
            })
        );
    }
}
