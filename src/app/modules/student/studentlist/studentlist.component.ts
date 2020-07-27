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

  title = 'Student List';
  students: StudentDto[] = [];
  private studentSub: Subscription;

  constructor(private studentService: StudentService,
              private router: Router,
              private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.studentSub = this.studentService.students$.subscribe(
       s => this.students = s
    );
  }

  ngOnDestroy(): void {
    console.log('studentList unsubscribe from studentsub');
    this.studentSub.unsubscribe();
  }

}
