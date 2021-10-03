import { Component, OnInit } from '@angular/core';
import { StudentDto } from '../models/student';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    // request service load requested student
    this.studentService.loadCurrent(+this.route.snapshot.paramMap.get('id'))

    // subscribe to service current$ student steam
    this.studentService.current$.subscribe(c => this.model = c);
  }

  onSave(): void {
    this.studentService.update(this.model).subscribe(
      r => {
          this.router.navigate(['/students', this.model.id]);
          this.toastr.success(`Completed ${this.mode}`);
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/students']);
    this.toastr.info(`Cancelled ${this.mode}`);
  }

}
