import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// libs
import { throwIfAlreadyLoaded } from '@llstarscreamll/utils';
import {
  CoreModule,
  PlatformLanguageToken,
  PlatformWindowToken
} from '@llstarscreamll/core';

// bring in custom web services here...

// factories
export function winFactory() {
  return window;
}

export function platformLangFactory() {
  const browserLang = window.navigator.language || 'en'; // fallback English
  // browser language has 2 codes, ex: 'en-US'
  return browserLang.split('-')[0];
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule.forRoot([
      {
        provide: PlatformLanguageToken,
        useFactory: platformLangFactory
      },
      {
        provide: PlatformWindowToken,
        useFactory: winFactory
      }
    ])
  ]
})
export class LlstarscreamllCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: LlstarscreamllCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'LlstarscreamllCoreModule');
  }
}
