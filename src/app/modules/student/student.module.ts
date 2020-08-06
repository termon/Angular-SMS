import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { GradePipe } from './pipes/grade.pipe';
import { StudentService } from './services/student.service';
import { StudentRoutingModule } from './student-routing.module';

import { StudentlistComponent } from './studentlist/studentlist.component';
import { StudentformComponent } from './studentform/studentform.component';
import { StudentviewComponent } from './studentview/studentview.component';
import { StudentcreateComponent } from './studentcreate/studentcreate.component';
import { StudentupdateComponent } from './studentupdate/studentupdate.component';
import { StudentreactiveformComponent } from './studentreactiveform/studentreactiveform.component';
import { EmailAvailableValidator } from './studentform/emailavailable-validator';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    GradePipe,
    StudentlistComponent,
    StudentformComponent,
    StudentviewComponent,
    StudentcreateComponent,
    StudentupdateComponent,
    StudentreactiveformComponent,
    EmailAvailableValidator
  ],
  imports: [
    SharedModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    StudentlistComponent,
    StudentcreateComponent,
    StudentviewComponent
  ],
  providers: [StudentService]
})
export class StudentModule { }
