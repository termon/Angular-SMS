import { Component, OnInit } from '@angular/core';
import { StudentDto } from '../models/student';
import { StudentService } from '../services/student.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
      this.studentService.add(this.model).subscribe(r => {
            this.router.navigate(['/students']);
            this.toastr.success('Student Created Successfully');
      });
  }

  onCancel(): void {
    this.router.navigate(['/students']);
    this.toastr.info('Student Creation Cancelled');
  }

}
