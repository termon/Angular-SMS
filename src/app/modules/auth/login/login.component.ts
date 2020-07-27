import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: Login;

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.model = new Login();
  }

  private loginSuccess(r: User) {
    console.log('Login Response', r)
    this.toastr.success('Successfully logged in');
    this.router.navigate(['/']);
  }

  private loginFailure(r: HttpErrorResponse) {
      console.log('Error response', r);
      this.toastr.error(r.message, 'Error', {timeOut: 5000});
  }

  onSubmit() {
    console.log('Submit', this.model);
    this.auth.login(this.model.emailAddress, this.model.password)
        .subscribe(
          r => this.loginSuccess(r),
          e => this.loginFailure(e)
        );
  }

}
