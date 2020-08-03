import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/Register';

import { tap } from 'rxjs/operators';;
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LogService } from '../../../core/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private baseUrl = 'https://localhost:5001';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private log: LogService
  ) {
    this.log.debug('AuthService', 'created....');
  }

  login(email: string, password: string ): Observable<User> {
      return this.http
        .post<User>(`${this.baseUrl}/api/user/login`, { emailAddress: email, password})
        .pipe(
          tap( r => {
              this.setSession(r.token);
          })
        );
  }

  register(request: Register ): Observable<User> {
    this.log.info('AuthService', 'Register', request);
    return this.http
      .post<User>(`${this.baseUrl}/api/user/register`, request);
  }

  logout(): void {
      this.log.debug('AuthService', 'logout');
      localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return true or false
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getEmail(): string {
    const claims = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    return ('email' in claims) ? claims.email : '';
  }

  isLoggedOut(): boolean {
      return !this.isLoggedIn();
  }

  private setSession(authResult: string): void {
    this.log.debug('AuthService', 'storing token', authResult);
    localStorage.setItem('token', authResult);
  }

  verifyEmailAvailable(email: string): Observable<boolean> {
    this.log.debug('AuthService', 'verifying email', email);
    return this.http.get<boolean>(`${this.baseUrl}/api/user/verify/${email}`);
  }

  ngOnDestroy(): void {
    this.log.debug('AuthService destroyed....');
  }

}
