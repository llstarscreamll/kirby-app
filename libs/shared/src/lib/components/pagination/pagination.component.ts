import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { get } from 'lodash-es';

@Component({
  selector: 'kirby-pagination',
  template: `
    <button
      [disabled]="disablePrev"
      mat-icon-button
      (click)="clickPrev()"
      class="prev"
    >
      <mat-icon>navigate_before</mat-icon>
    </button>
    <button
      [disabled]="disabledNext"
      mat-icon-button
      (click)="clickNext()"
      class="next"
    >
      <mat-icon>navigate_next</mat-icon>
    </button>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Input()
  public pagination: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
    last_page?: number;
    total?: number;
  };

  @Output()
  paginate = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get currentPage(): number {
    return get(this.pagination, 'current_page', 0);
  }

  get disablePrev(): boolean {
    return !this.pagination || this.currentPage === 1;
  }

  get disabledNext(): boolean {
    return !this.pagination || this.pagination.to < this.pagination.per_page;
  }

  clickPrev() {
    this.paginate.emit({ page: this.currentPage - 1 });
  }

  clickNext() {
    this.paginate.emit({ page: this.currentPage + 1 });
  }
}
