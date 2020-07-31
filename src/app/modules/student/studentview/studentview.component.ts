import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { StudentService } from '../services/student.service';
import { StudentDto } from '../models/student';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-studentview',
  templateUrl: './studentview.component.html',
  styleUrls: ['./studentview.component.css'],
})
export class StudentviewComponent implements OnInit {
  student: StudentDto = new StudentDto();
  sub: Subject<StudentDto>;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentService.loadCurrent(+params.get('id'));
    });
    this.studentService.current$.subscribe(c => this.student = c);
  }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe((params) => {
  //     this.studentService.get(+params.get('id')).subscribe(
  //       r =>  this.student = c,
  //       e =>   {
  //         this.toastr.warning('Could not locate student');
  //         this.router.navigate(['/students']);
  //       }
  //     );
  //   });
  // }

  delete(student: StudentDto): void {
    this.studentService.delete(student.id).subscribe((r) => {
      console.log('deleted student ', student.id);
      this.router.navigate(['/students']);
      this.toastr.success('Student Deleted Successfully');
    });
  }

  closeTicket(id: number): void {
    this.studentService.close(id).subscribe(
      r => this.toastr.success('Ticket closed Successfully'),
      e => this.toastr.error(e.message)
      );
  }
}
