import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}


  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      console.log('AuthGuard not-authenticated');
      this.router.navigate(['/auth/login']);
      return false;
    }
    console.log('AuthGuard authenticated');
    return true;
  }
}
