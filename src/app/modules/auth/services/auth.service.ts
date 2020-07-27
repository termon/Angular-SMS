import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/Register';

import { tap } from 'rxjs/operators';;
import { User } from '../models/user';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:5001';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(email: string, password: string ): Observable<User> {
      return this.http
        .post<User>(`${this.baseUrl}/api/user/login`, { emailAddress: email, password})
        .pipe(
          tap( r => {
              this.setSession(r.token);
          })
        );
  }

  register(request: Register ) {
    console.log('Register', JSON.stringify(request));
    return this.http
      .post<User>(`${this.baseUrl}/api/user/register`, request);
  }

  logout() {
      console.log('Logging out - deleting token');
      localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return true or false
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getEmail() {
    const claims = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    return ('email' in claims) ? claims.email : '';
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  private setSession(authResult: string) {
    console.log('Setting session', authResult);
    localStorage.setItem('token', authResult);
    console.log(this.jwtHelper.decodeToken(localStorage.getItem('token')));

  }

  verifyEmailAvailable(email: string): Observable<boolean> {
    console.log('Verifying email ${email}')
    return this.http.get<boolean>(`${this.baseUrl}/api/user/verify/${email}`);
  }

}
