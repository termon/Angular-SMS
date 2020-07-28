import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';

import { HttpErrorInterceptor } from './core/interceptors/HttpErrorInterceptor';

import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
// import { BootstrapModule } from './modules/bootstrap/bootstrap.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      // positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          console.log('getting token for JWThelper');
          return localStorage.getItem('token');
        },
        allowedDomains: ['localhost:5001'], // unless set correctly auth header will not be added
      },
    }),
    // application feature modules
    CoreModule,
    AuthModule,
    StudentModule,
    // BootstrapModule // ngx-bootstrap
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
