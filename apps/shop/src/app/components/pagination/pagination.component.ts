import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { get } from 'lodash-es';

@Component({
  selector: 'shop-pagination',
  template: `
    <button
      [disabled]="disablePrev"
      (click)="clickPrev()"
      [ngClass]="prevClassMap"
      class="prev h-8 w-8 mx-2 font-normal border rounded-full"
    >
      <i class="fas fa-step-backward"></i>
    </button>
    <button
      [disabled]="disabledNext"
      (click)="clickNext()"
      [ngClass]="nextClassMap"
      class="next h-8 w-8 mx-2 font-normal border rounded-full"
    >
      <i class="fas fa-step-forward"></i>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input()
  pagination: null | any = {
    count: 0,
    current_page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
  };

  @Output()
  paginate = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get currentPage(): number {
    return get(this.pagination, 'current_page', 0);
  }

  get disablePrev(): boolean {
    return !this.pagination || this.currentPage <= 1;
  }

  get disabledNext(): boolean {
    return this.pagination.current_page === this.pagination.total_pages;
  }

  get prevClassMap() {
    return {
      'bg-gray-100': this.disablePrev,
      'bg-gray-200': !this.disablePrev,
      'text-gray-500': !this.disablePrev,
      'text-gray-300': this.disablePrev,
      'border-gray-500': !this.disablePrev,
      'border-gray-300': this.disablePrev,
      'cursor-not-allowed': this.disablePrev,
    };
  }

  get nextClassMap() {
    return {
      'bg-gray-100': this.disabledNext,
      'bg-gray-200': !this.disabledNext,
      'text-gray-500': !this.disabledNext,
      'text-gray-300': this.disabledNext,
      'border-gray-500': !this.disabledNext,
      'border-gray-300': this.disabledNext,
      'cursor-not-allowed': this.disabledNext,
    };
  }

  clickPrev() {
    this.paginate.emit({ page: this.currentPage - 1 });
  }

  clickNext() {
    this.paginate.emit({ page: this.currentPage + 1 });
  }
}
