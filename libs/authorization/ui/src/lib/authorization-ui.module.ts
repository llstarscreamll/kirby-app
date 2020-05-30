import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanDirective } from './directives/can/can.directive';
import { AuthenticationDataAccessModule } from '@kirby/authentication-data-access';

@NgModule({
  imports: [CommonModule, AuthenticationDataAccessModule],
  declarations: [CanDirective],
  exports: [CanDirective]
})
export class AuthorizationUiModule {}
