import { Component, Input } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  providers: [ NgbModalConfig, NgbModal ]
})
export class ConfirmModalComponent  {

  @Input() title;
  @Input() message;

  constructor(public activeModal: NgbActiveModal) {}
  // constructor(config: NgbModalConfig, public activeModal: NgbActiveModal) {
  //     // customize default values of modals used by this component tree
  //     config.backdrop = 'static';
  //     config.keyboard = false;
  //     config.centered = true;
  // }
}
