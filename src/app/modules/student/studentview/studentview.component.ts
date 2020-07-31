import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { StudentService } from '../services/student.service';
import { StudentDto } from '../models/student';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

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
    // use service to load requested student into current$ stream
    this.loadStudentFromRouteParam();
    // subscribe to service current$ student steam
    this.studentService.current$.subscribe(c => this.student = c);
  }

  delete(student: StudentDto): void {
    this.studentService.delete(student.id).subscribe((r) => {
      console.log('deleted student ', student.id);
      this.router.navigate(['/students']);
      this.toastr.success('Student Deleted Successfully');
    });
  }

  closeTicket(id: number): void {
    this.studentService.close(id).subscribe(
      r => this.toastr.success(`Ticket ${r.id} closed Successfully`),
      e => this.toastr.error(e.message)
      );
  }

  private loadStudentFromRouteParam(): void {
    this.route.paramMap.subscribe(
      params => {
        this.studentService.loadCurrent(+params.get('id'));
      },
      error => {
        this.toastr.error(error.message);
        this.router.navigate(['/students']);
      }
    );
  }

}
