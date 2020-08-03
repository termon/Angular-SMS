import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { LogService } from 'src/app/core/services/log.service';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthGuardService implements CanActivate, OnDestroy {

  constructor(
    public auth: AuthService,
    public router: Router,
    private log: LogService
  ) {
    log.debug('AuthGuard', 'created...');
  }

  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.log.warn('AuthGuard not-authenticated');
      this.router.navigate(['/auth/login']);
      return false;
    }
    this.log.info('AuthGuard authenticated');
    return true;
  }

  ngOnDestroy(): void {
    this.log.debug('AuthGuard', 'destroyed...');
  }
}
