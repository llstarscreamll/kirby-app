import { Component, Input } from '@angular/core';
import { Weighing } from '../../+state/models';

@Component({
  selector: 'kirby-weighing-status',
  template: `
    <span
      class="rounded border py-2 px-3 mt-3"
      [ngClass]="{
        'bg-green-300 text-green-700 border-green-400': weighing?.isInProgress(),
        'bg-yellow-300 text-yellow-700 border-yellow-400': weighing?.isFinished(),
        'bg-red-200 text-red-700 border-red-400': weighing?.isCanceled()
      }"
    >
      {{ weighing?.readableStatus }}
    </span>
  `,
})
export class WeighingStatusLabelComponent {
  @Input() weighing: Weighing | null = null;
}
