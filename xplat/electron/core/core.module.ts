import { NgModule, Optional, SkipSelf } from '@angular/core';

import { throwIfAlreadyLoaded } from '@llstarscreamll/utils';
import { ELECTRON_PROVIDERS, ElectronService } from './services';

@NgModule({
  providers: [...ELECTRON_PROVIDERS]
})
export class llstarscreamllElectronCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: llstarscreamllElectronCoreModule,
    private _electronService: ElectronService
  ) {
    throwIfAlreadyLoaded(parentModule, 'llstarscreamllElectronCoreModule');
  }
}
