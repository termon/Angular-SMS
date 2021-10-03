import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { StudentDto } from '../models/student';
import { StudentService } from '../services/student.service';
import { ProblemDetails } from '@app/core/models/ErrorResponse';

@Component({
  selector: 'app-studentcreate',
  templateUrl: './studentcreate.component.html',
  styleUrls: ['./studentcreate.component.css']
})
export class StudentcreateComponent {

  mode = 'create';
  model = new StudentDto();

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSave(): void {
      // global HttpErrorInterceptor handles errors
      this.studentService.add(this.model).subscribe(r => {
            this.router.navigate(['/students', r.id]);
            this.toastr.success('Student Created Successfully');
      });
  }

  onCancel(): void {
    this.router.navigate(['/students']);
    this.toastr.info('Student Creation Cancelled');
  }

}
