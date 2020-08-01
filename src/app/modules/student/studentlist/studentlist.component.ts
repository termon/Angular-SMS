import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentDto } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from '../../../core/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
              private modal: NgbModal
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

  delete(s: StudentDto): void {
    const ref = this.modal.open(ConfirmModalComponent, { centered: true });
    ref.componentInstance.title = 'Confirm';
    ref.componentInstance.message = `Are you sure you want to delete student ${s.name}`;
    ref.result.then(
      (resolve) => {
        this.studentService.delete(s.id).subscribe(
          r => this.toastr.info('Student deleted'),
          e => this.toastr.error(e.message)
        );
      },
      (reject) => this.toastr.info('Student deletion Cancelled')
    );
  }

}
