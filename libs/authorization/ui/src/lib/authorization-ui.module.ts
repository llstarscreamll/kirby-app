import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanDirective } from './directives/can/can.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CanDirective],
  exports: [CanDirective]
})
export class AuthorizationUiModule {}
