import { Component, OnInit } from '@angular/core';
import { StudentDto } from '../models/student';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-studentupdate',
  templateUrl: './studentupdate.component.html',
  styleUrls: ['./studentupdate.component.css']
})
export class StudentupdateComponent implements OnInit {

  mode = 'update';
  model: StudentDto = new StudentDto();

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.studentService.loadCurrent(+params.get('id'));
      },
      error => {
        this.toastr.error(error.message);
        this.router.navigate(['/students']);
      }
    );
    // subscribe to service current$ student steam
    this.studentService.current$.subscribe(c => this.model = c);
  }

  onSave(): void {
    this.studentService.update(this.model).subscribe(
      r => {
          this.router.navigate(['/students', this.model.id]);
          this.toastr.success(`Completed ${this.mode}`);
      },
      e => {
        this.toastr.error(`Status:${e.status} - ${e.title}`);
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/students']);
    this.toastr.info(`Cancelled ${this.mode}`);
  }

}
