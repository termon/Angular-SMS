import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { StudentService } from '../services/student.service';
import { StudentDto } from '../models/Student';

@Component({
  selector: 'app-studentview',
  templateUrl: './studentview.component.html',
  styleUrls: ['./studentview.component.css'],
})
export class StudentviewComponent implements OnInit {
  student: StudentDto = new StudentDto();

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentService.get(+params.get('id')).subscribe(
        r =>   this.student = r,
        e =>   {
          this.toastr.warning('Could not locate student');
          this.router.navigate(['/students']);
        }
      );
    });
  }

  delete(student: StudentDto) {
    this.studentService.delete(student.id).subscribe((r) => {
      console.log('deleted student ', student.id);
      this.router.navigate(['/students']);
      this.toastr.success('Student Deleted Successfully');
    });
  }
}
