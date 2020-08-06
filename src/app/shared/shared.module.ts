import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
@NgModule({
  declarations: [  ConfirmModalComponent ],
  imports: [
    CommonModule,
    BootstrapModule
  ],
  entryComponents: [ ConfirmModalComponent ], // loaded imperatively rather than referenced in template
  exports: [  CommonModule, BootstrapModule, ConfirmModalComponent ]
})
export class SharedModule {

  // static forRoot(): ModuleWithProviders<SharedModule> {
  //   return {
  //       ngModule: CoreModule,
  //       providers: []
  //   };
  // }
 }
