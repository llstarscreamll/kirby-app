import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'kirby-weighings-list',
  templateUrl: './weighings-list.page.html',
})
export class WeighingsListPage {
  apiError$ = new Observable<any>();
}
