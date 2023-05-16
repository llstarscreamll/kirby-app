import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'kirby-edit-weighing',
  templateUrl: './edit-weighing.page.html',
  styleUrls: ['./edit-weighing.page.scss'],
})
export class EditWeighingPage {
  apiError$ = new Observable<any>();
}
