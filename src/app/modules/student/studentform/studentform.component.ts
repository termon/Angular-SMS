import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StudentDto } from '../models/Student';
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

  onSubmit() {
    console.log('saving', this.model);
    this.saveEmitter.emit(this.model);
  }

  onCancel() {
    console.log('cancel');
    this.cancelEmitter.emit();
  }

}