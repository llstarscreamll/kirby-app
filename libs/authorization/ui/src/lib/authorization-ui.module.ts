import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanDirective } from './directives/can/can.directive';
import { CantDirective } from './directives/can/cant.directive';
import { CanAnyDirective } from './directives/can/canAny.directive';
import { AuthenticationDataAccessModule } from '@kirby/authentication-data-access';

@NgModule({
  imports: [CommonModule, AuthenticationDataAccessModule],
  declarations: [CanDirective, CanAnyDirective, CantDirective],
  exports: [CanDirective, CanAnyDirective, CantDirective],
})
export class AuthorizationUiModule {}
