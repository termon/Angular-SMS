import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { StudentService } from '../services/student.service';
import { CloseTicketDto, StudentDto } from '../models/student';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';

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
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    // use service to load requested student into current$ stream
    this.studentService.loadCurrent(+this.route.snapshot.paramMap.get('id'))

    // subscribe to service current$ student steam
    this.studentService.current$.subscribe(
      c => this.student = c,
      e => this.toastr.error(e.message)
    );
  }

  confirm(student: StudentDto): void {
    const ref = this.modal.open(ConfirmModalComponent, { centered: true });
    ref.componentInstance.title = 'Confirm';
    ref.componentInstance.message = `Are you sure you want to delete ${student.name}?`;
    ref.result.then(
      (resolve) => this.delete(student),
      (reject) => this.toastr.info('Student deletion Cancelled')
    );
  }

  closeTicket(id:number): void {
    // TODO: default resolution until form input feature added
    const dto: CloseTicketDto = { id, resolution: 'default resolution' }

    this.studentService.close(dto).subscribe(
      r => this.toastr.success(`Ticket ${r.id} closed Successfully`)
    );
  }

  private delete(student: StudentDto): void {
    this.studentService.delete(student.id).subscribe((r) => {
      this.router.navigate(['/students']);
      this.toastr.success('Student Deleted Successfully');
    });
  }

  // alternative approach subscribes to
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
