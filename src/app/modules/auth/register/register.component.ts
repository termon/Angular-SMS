import { Component, OnInit } from '@angular/core';
import { Register } from '../models/Register';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../models/Role';
import { RegisteredValidator } from './registered.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roles = Role.values();
  model: Register;

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.model = new Register();
    console.log(this.roles);
  }

  onCancel() {
    this.toastr.success('Registration Cancelled');
    this.router.navigate(['/auth/login']);
  }

  onSubmit() {
    this.auth.register(this.model)
        .subscribe(
          s => {
            this.toastr.success('Successfully registered');
            this.router.navigate(['/auth/login']);
          },
          e => {
            this.toastr.error(e.message);
          }
        );
  }

}
