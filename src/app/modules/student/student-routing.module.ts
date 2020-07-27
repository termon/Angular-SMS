import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { StudentcreateComponent } from './studentcreate/studentcreate.component';
import { StudentviewComponent } from './studentview/studentview.component';
import { AuthGuardService as AuthGuard } from '../auth/services/auth-guard.service';
import { StudentupdateComponent } from './studentupdate/studentupdate.component';

const routes: Routes = [
  { path: '', component: StudentlistComponent, canActivate: [AuthGuard] },
  { path: 'create', component: StudentcreateComponent,  canActivate: [AuthGuard] },
  { path: ':id', component: StudentviewComponent, canActivate: [AuthGuard] },
  { path: ':id/update', component: StudentupdateComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
