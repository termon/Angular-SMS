import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StudentDto } from '../models/student';
import { EmailAvailableValidator } from './emailavailable-validator';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})
export class StudentformComponent {

  @Input() mode = 'create';
  @Input() model = new StudentDto();
  @Output() saveEmitter = new EventEmitter<StudentDto>();
  @Output() cancelEmitter = new EventEmitter();

  onSubmit(): void {
    this.saveEmitter.emit(this.model);
  }

  onCancel(): void {
    this.cancelEmitter.emit();
  }

}
