import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'kirby-create-weighing',
  templateUrl: './create-weighing.page.html',
  styleUrls: ['./create-weighing.page.scss'],
})
export class CreateWeighingPage {
  apiError$ = new Observable<any>();
}
