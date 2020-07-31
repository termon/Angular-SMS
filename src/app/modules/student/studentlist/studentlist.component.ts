import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentDto } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit, OnDestroy {

  title = 'Registered Students';
  students: StudentDto[] = [];
  private sub: Subscription;

  constructor(public studentService: StudentService,
              private router: Router,
              private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // subscribe to students stream
    console.log('studentList subscribe to sub');
    this.sub = this.studentService.students$.subscribe(
       s => this.students = s
    );
  }

  ngOnDestroy(): void {
    console.log('studentList unsubscribe from sub');
    this.sub.unsubscribe();
  }

  delete(id: number): void {
    this.studentService.delete(id).subscribe(
      r => this.toastr.info('Student deleted'),
      e => this.toastr.error(e.message)
    );
  }

}
