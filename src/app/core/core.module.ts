import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [ LoadingComponent, ConfirmModalComponent ],
  imports: [
    CommonModule,
    BootstrapModule
  ],
  entryComponents: [ ConfirmModalComponent ], // loaded imperatively rather than referenced in template
  exports: [ LoadingComponent, BootstrapModule, ConfirmModalComponent, CommonModule ]
})
export class CoreModule {

  // static forRoot(): ModuleWithProviders<CoreModule> {
  //   return {
  //       ngModule: CoreModule,
  //       providers: []
  //   };
  // }
 }
