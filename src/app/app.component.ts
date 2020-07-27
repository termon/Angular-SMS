import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService,
              private router: Router,
              private toastr: ToastrService) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
    this.toastr.success('Successfully logged out');
  }
}
