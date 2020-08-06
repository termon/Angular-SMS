import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LoadingComponent } from './loading/loading.component';
import { LogService } from './services/log.service';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ LoadingComponent ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({ timeOut: 2000, preventDuplicates: true }),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['localhost:5001'], // unless set correctly auth header will not be added
      },
    }),
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    LogService
  ],
  exports: [ LoadingComponent, CommonModule, BrowserAnimationsModule, NgxSpinnerModule, ToastrModule ]
})
export class CoreModule {

  // static forRoot(): ModuleWithProviders<CoreModule> {
  //   return {
  //       ngModule: CoreModule,
  //       providers: []
  //   };
  // }
 }
