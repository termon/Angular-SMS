import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StudentDto } from '../models/student';
import { StudentService } from '../services/student.service';

import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { LogService } from '../../../core/services/log.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent {

  title = 'Registered Students';

  constructor(public studentService: StudentService,
              private router: Router,
              private toastr: ToastrService,
              private modal: NgbModal,
              private log: LogService
  ) {
    this.log.info('StudentListComponent Created....');
    this.studentService.loadStudents();
  }


  delete(s: StudentDto): void {
    const ref = this.modal.open(ConfirmModalComponent, { centered: true });
    ref.componentInstance.title = 'Confirm';
    ref.componentInstance.message = `Are you sure you want to delete student ${s.name}`;
    ref.result.then(
      (resolve) => {
        this.studentService.delete(s.id).subscribe(
          r => this.toastr.info('Student deleted')
        );
      },
      (reject) => {
        this.toastr.info('Student deletion Cancelled');
        this.log.debug('StudentList Component', 'delete', reject);
      }
    );
  }

}
