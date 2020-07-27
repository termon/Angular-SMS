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
    this.load();
  }

  onSave(): void {
    this.studentService.update(this.model).subscribe(r => {
          this.router.navigate(['/students', this.model.id]);
          this.toastr.success(`Completed ${this.mode}`);
    });
  }

  onCancel(): void {
    this.router.navigate(['/students']);
    this.toastr.info(`Cancelled ${this.mode}`);
  }

  load(): void {
    this.route.paramMap.subscribe(params => {
    this.studentService.get(+params.get('id'))
        .subscribe(
          r => {
            this.model = r;
            console.log('load', this.model);
          },
          e => {
            this.toastr.warning('Could not locate student');
            this.router.navigate(['/students']);
          }
        );
    });
  }


}
