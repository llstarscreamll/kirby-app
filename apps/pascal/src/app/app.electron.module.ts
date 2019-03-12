import { NgModule } from '@angular/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { llstarscreamllElectronCoreModule } from '@llstarscreamll/electron';

@NgModule({
  imports: [
    AppModule,
    llstarscreamllElectronCoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppElectronModule { }
