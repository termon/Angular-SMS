import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: Login;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private log: LogService
  ) { }

  ngOnInit(): void {
    this.model = new Login();
  }

  private loginSuccess(r: User): void {
    this.log.debug('Login Response', r);
    this.toastr.success('Successfully logged in');
    this.router.navigate(['/']);
  }

  private loginFailure(r: HttpErrorResponse): void {
      this.log.error('Login Response', r);
      this.toastr.error(r.message, 'Error', {timeOut: 5000});
  }

  onSubmit(): void {
    this.log.debug('LoginComponent onSubmit', this.model);
    this.auth.login(this.model.email, this.model.password)
        .subscribe(
          r => this.loginSuccess(r),
          e => this.loginFailure(e)
        );
  }

}
