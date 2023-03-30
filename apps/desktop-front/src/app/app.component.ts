import { Component } from '@angular/core';

@Component({
  selector: 'kirby-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        display: block;
        font-family: sans-serif;
        margin: 20px;
      }
    `,
  ],
})
export class AppComponent {}
