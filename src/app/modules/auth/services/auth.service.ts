import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/Register';

import { tap } from 'rxjs/operators';;
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LogService } from '@app/core/services/log.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private baseUrl = environment.apiUrl ?? 'https://localhost:5001';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private log: LogService
  ) {
    this.log.info('AuthService', 'created....');
  }

  login(email: string, password: string): Observable<User> {
    this.log.info('AuthService', 'Login', email);
    return this.http
      .post<User>(`${this.baseUrl}/api/user/login`, { email, password })
      .pipe(
        tap(r => {
          this.setSession(r.token);
        })
      );
  }

  register(request: Register): Observable<User> {
    this.log.info('AuthService', 'Register', request);
    return this.http
      .post<User>(`${this.baseUrl}/api/user/register`, request);
  }

  logout(): void {
    this.log.info('AuthService', 'logout');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return true or false
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getEmail(): string {
    const claims = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    return claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ?? 'Unknown'
  }

  getName(): string {
    const claims = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    return claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? 'Unknown';
    //return ('name' in claims) ? claims.name : 'Unknown';
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
    this.log.info('AuthService destroyed....');
  }

}
