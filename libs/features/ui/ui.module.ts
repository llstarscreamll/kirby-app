import { NgModule } from '@angular/core';
import { PIPES } from './pipes';

const MODULES = [];

@NgModule({
  imports: [...MODULES],
  declarations: [...PIPES],
  exports: [...MODULES, ...PIPES]
})
export class UISharedModule { }
