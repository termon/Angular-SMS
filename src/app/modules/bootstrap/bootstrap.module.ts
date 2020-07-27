import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlertModule,
    ButtonsModule
  ],
  exports: [
    AlertModule,
    ButtonsModule
  ]
})
export class BootstrapModule {

  static forRoot(): ModuleWithProviders<BootstrapModule> {
    return {
        ngModule: BootstrapModule,
        providers: []
    };
  }
}
