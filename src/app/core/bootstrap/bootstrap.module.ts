import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbAlertModule,
    NgbPaginationModule,
    NgbModalModule
  ],
  exports: [
    NgbAlertModule, NgbPaginationModule, NgbModalModule
  ]
})
export class BootstrapModule {}
