import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanDirective } from './directives/can/can.directive';
import { CantDirective } from './directives/can/cant.directive';
import { CanAnyDirective } from './directives/can/canAny.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CanDirective, CanAnyDirective, CantDirective],
  exports: [CanDirective, CanAnyDirective, CantDirective],
})
export class AuthorizationUiModule {}
